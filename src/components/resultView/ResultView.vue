<template>
  <div>
    <div class="text-center text-5xl">{{fileName}}</div>
    <div class="flex justify-between">
      <div class="ace-editor-wrapper">
        <AceEditor
          id="ace-import-editor"
          v-model="content"
          @init="editorInit"
          @input="editorChange"
          v-bind:lang="selectedInputFormatLang"
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
            v-bind:lang="selectedOutputFormatLang"
            v-bind:options="editorOptions"
            theme="holistics"
            ref="aceEditor"
            class="editor"
          />
        </div>
    </div>
  </div>
</template>
<script>
import AceEditor from 'vue2-ace-editor';
import ace from 'brace';
// import debounce from 'lodash/debounce';
import 'brace/mode/pgsql'; // language
import 'brace/mode/mysql';
import 'brace/mode/sqlserver';
import 'brace/mode/json';
import './dbml_mode';
import './holistics_theme';
import formats from './constants';

console.log(formats);
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
    fileName: {
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
        fontSize: 14,
        maxLines: 40,
        showPrintMargin: false,
        fontFamily: 'monospace',
      },
      content: this.initContent,
      output: this.initOutput,
      parseError: null,
    });
  },
  computed: {
    selectedInputFormatLang() {
      return (formats[this.$store.state.inputType] || {}).editorLang || 'text';
    },
    selectedOutputFormatLang() {
      return (formats[this.$store.state.outputType] || {}).editorLang || 'text';
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
    initContent(newValue) {
      this.content = newValue;
    },
    initOutput(newValue) {
      this.output = newValue;
    },
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
    // eslint-disable-next-line no-unused-vars
    editorChange(content) {
      // this.parse(content);
    },
  },
};


</script>
<style scoped>
  .ace-editor-wrapper {
    margin-bottom: 5rem;
    width: 50%;
  }
</style>
