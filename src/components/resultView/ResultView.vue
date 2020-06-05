<template>
  <div class="flex justify-between">
    <div class="ace-editor-wrapper">
      <AceEditor
        id="ace-import-editor"
        v-model="content"
        @init="editorInit"
        @input="editorChange"
        v-bind:lang="selectedFormatLang"
        v-bind:options="editorOptions"
        theme="holistics"
        ref="aceEditor"
        class="editor"
      />
    </div>
    <div class="ace-editor-wrapper">
      <AceEditor
        id="ace-import-editor"
        v-model="output"
        @init="editorInit"
        v-bind:lang="selectedFormatLang"
        v-bind:options="editorOptions"
        theme="holistics"
        ref="aceEditor"
        class="editor"
      />
    </div>
  </div>
</template>
<script>
import AceEditor from 'vue2-ace-editor';
import ace from 'brace';
import debounce from 'lodash/debounce';
import 'brace/mode/pgsql'; // language
import 'brace/mode/mysql';
import 'brace/mode/sqlserver';
import './dbml_mode';
import './holistics_theme';
import formats from 'constants';

export default {
  name: 'ResultView',
  components: {
    AceEditor,
  },
  props: {
    initContent: {
      type: String,
      default: '',
    },
    initOutput: {
      type: String,
      default: '',
    },
  },
  data() {
    return ({
      isEditorOpen: true,
      editorOptions: {
        tabSize: 2,
        // enableBasicAutocompletion: true,
        // enableLiveAutocompletion: true,
        hScrollBarAlwaysVisible: false,
        vScrollBarAlwaysVisible: false,
        fontSize: 12,
        minLines: 20,
        maxLines: 20,
        showPrintMargin: false,
        fontFamily: 'Droid Sans Mono',
      },
      content: this.initContent,
      output: this.initOutput,
      parseError: null,
    });
  },
  computed: {
    selectedFormatLang() {
      return (formats[this.type] || {}).editorLang || 'text';
    },
    selectedFormatName() {
      return (formats[this.type] || {}).name || 'SQL';
    },
    extensionFile() {
      return `.${(formats[this.type] || {}).fileExtension || 'sql'}`;
    },
    uploadFile() {
      return `${(formats[this.type] || {}).uploadFile || '.sql'}`;
    },
  },
  watch: {
    parseError(error) {
      const editor = ace.edit('ace-import-editor');
      const editorSession = editor.getSession();
      editorSession.clearAnnotations();
      if (error && error.location) {
        editorSession.clearAnnotations();
        editorSession.setAnnotations([{
          row: error.row,
          column: error.column,
          text: error.text,
          type: error.type,
        }]);
      }
    },
  },
  updated() {
    if (this.show) {
      const editor = ace.edit('ace-import-editor');
      editor.resize();
      if (this.parseError) {
        editor.scrollToLine(this.parseError.row, true, true);
      }
    }
  },
  methods: {
    editorInit() {
      require('ace-builds/src-min-noconflict/ace'); // eslint-disable-line
      require('ace-builds/src-min-noconflict/theme-tomorrow_night_bright'); // eslint-disable-line
      require('ace-builds/src-min-noconflict/mode-pgsql'); // eslint-disable-line
      require('ace-builds/src-min-noconflict/mode-mysql'); // eslint-disable-line
      require('ace-builds/src-min-noconflict/mode-sqlserver'); // eslint-disable-line
      require('ace-builds/src-min-noconflict/mode-ruby'); // eslint-disable-line
      require('ace-builds/src-min-noconflict/ext-language_tools'); // eslint-disable-line
      require('ace-builds/src-min-noconflict/ext-searchbox'); // eslint-disable-line
      require('brace/theme/chrome'); //eslint-disable-line
    },
    editorChange(content) {
      this.parse(content);
    },

    parseDirectly(content) {
      const editor = ace.edit('ace-import-editor');
      const editorSession = editor.getSession();
      editorSession.clearAnnotations();
      if (content && content.length > 0) {
        try {
          const parse = ''; // importer.import(content, this.type);
          this.parseError = null;
          return parse;
        } catch (err) {
          this.parseError = {
            row: err.location.start.line - 1,
            column: err.location.start.column,
            text: err.message,
            type: 'error',
            ...err,
          };
          return null;
        }
      }
      this.parseError = null;
      return null;
    },
    parse: debounce(function parse(content) {
      return this.parseDirectly(content);
    }, 300),
  },
};


</script>
<style scoped>
  .ace-editor-wrapper {
    height: 100vh;
    width: 50%;
    margin-bottom: 10rem;
  }
</style>
