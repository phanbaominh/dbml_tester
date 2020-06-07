<template>
  <div>
    <div>
      <div class="text-center text-5xl">{{file.name}}</div>
      <button @click="downloadOutputFile">Download Output</button>
    </div>
    <div class="flex justify-between">
      <div class="ace-editor-wrapper">
        <AceEditor
          :id="inputEditorId"
          v-model="content"
          @init="editorInit"
          @input="editorChange"
          v-bind:lang="selectedInputFormatLang"
          v-bind:options="editorOptions"
          theme="holistics"
          ref="aceEditor"
          class="editor"
        />
        <div v-if="parseError" class="error-container">
            {{parseErrorText}}
        </div>
      </div>
      <div class="ace-editor-wrapper">
          <AceEditor
            :id="outputEditorId"
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
import debounce from 'lodash/debounce';
import $ from 'jquery';
import 'brace/mode/pgsql'; // language
import 'brace/mode/mysql';
import 'brace/mode/sqlserver';
import 'brace/mode/json';
import 'brace/ext/language_tools';
import 'brace/ext/searchbox';
import './dbml_mode';
import './holistics_theme';
import { Parser, ModelExporter } from '@dbml/core';
import formats from './constants';


let scrollIntoView;
export default {
  name: 'ResultView',
  components: {
    AceEditor,
  },
  props: {
    file: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return ({
      isEditorOpen: true,
      editorOptions: {
        tabSize: 2,
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        hScrollBarAlwaysVisible: false,
        vScrollBarAlwaysVisible: false,
        fontSize: 14,
        maxLines: 40,
        showPrintMargin: false,
        fontFamily: 'monospace',
      },
      content: this.file.content,
      output: '',
      parseError: '',
    });
  },
  computed: {
    selectedInputFormatLang() {
      return (formats[this.$store.state.inputType] || {}).editorLang || 'text';
    },
    selectedOutputFormatLang() {
      return (formats[this.$store.state.outputType] || {}).editorLang || 'text';
    },
    inputEditorId() {
      return `ace-input-editor-${this.file.id}`;
    },
    outputEditorId() {
      return `ace-output-editor-${this.file.id}`;
    },
    parseErrorText() {
      if (this.parseError.location) {
        return `${this.parseError.row + 1}:${this.parseError.column} ${this.parseError.text}`;
      }
      return `Internal Error: ${this.parseError.text}`;
    },
    isDownloadAll() {
      return this.$store.state.isDownloadAll;
    },
  },
  watch: {
    parseError(error) {
      const editor = ace.edit(this.inputEditorId);
      const editorSession = editor.getSession();
      const fileElement = this.getFileInfoEle();

      editorSession.clearAnnotations();
      if (error && error.location) {
        fileElement.toggleClass('file-info-error');
        editorSession.clearAnnotations();
        editorSession.setAnnotations([{
          row: error.row,
          column: error.column,
          text: error.text,
          type: error.type,
        }]);
      } else if (error || fileElement.hasClass('file-info-error')) {
        fileElement.toggleClass('file-info-error');
      }
    },
    'file.content': function (newValue) {
      this.content = newValue;
    },
    'file.isParsed': function () {
      if (this.file.isParsed) {
        this.$store.commit('setParsedState', this.file.id);
        this.parseDirectly(this.content);
      }
    },
    isDownloadAll(bool) {
      if (bool) {
        const output = {
          name: this.getOutputFileName(),
          content: this.output,
        };
        this.$store.dispatch('setOutputFile', output);
      }
    },
  },
  updated() {
    const editor = ace.edit(this.inputEditorId);
    editor.resize();
    if (this.parseError && this.parseError.location) {
      editor.scrollToLine(this.parseError.row, true, true);
    }
  },
  mounted() {
    ace.edit(this.outputEditorId).setReadOnly(true);
    const currentEl = this.$el;
    scrollIntoView = () => {
      currentEl.scrollIntoView();
    };
    const fileElement = this.getFileInfoEle();
    fileElement.css('pointer-events', 'auto');
    fileElement.addClass('file-info-hover');
    fileElement.on('click', scrollIntoView);
  },
  beforeDestroy() {
    this.getFileInfoEle().off('click', scrollIntoView);
  },
  methods: {
    getFileInfoEle() {
      return $(`#filepond--item-${this.file.id} .filepond--file-info`);
    },
    editorInit() {
      console.log('enabled!');
    },
    editorChange(content) {
      this.parse(content);
    },
    parseDirectly(content) {
      const editor = ace.edit(this.inputEditorId);
      const editorSession = editor.getSession();
      editorSession.clearAnnotations();
      if (content && content.length > 0) {
        try {
          const database = Parser.parse(this.content, this.$store.state.inputType);
          this.output = ModelExporter.export(database, this.$store.state.outputType, false);
          this.parseError = null;
        } catch (err) {
          this.output = '';
          this.parseError = {
            row: err.location ? err.location.start.line - 1 : 1,
            column: err.location ? err.location.start.column : 1,
            text: err.message,
            type: 'error',
            ...err,
          };
          if (!err.location) console.error(err);
          return null;
        }
      }
      this.parseError = null;
      return null;
    },
    parse: debounce(function parse(content) {
      return this.parseDirectly(content);
    }, 300),
    getOutputFileName() {
      let filename = '';
      const parts = this.file.name.split('.');
      parts.forEach((part, index) => {
        let addedPart = `${part}.`;
        if (index === parts.length - 1) {
          addedPart = this.$store.state.outputType;
        } else if (addedPart === 'in.') {
          addedPart = 'out.';
        }
        filename += addedPart;
      });
      return filename;
    },
    downloadOutputFile() {
      const element = document.createElement('a');
      $(element).attr('href', `data:text/plain;charset=utf-8,${encodeURIComponent(this.output)}`);
      $(element).attr('download', this.getOutputFileName());
      $(element).css('display', 'none');
      $(document.body).append(element);
      element.click();
      $(element).remove();
    },
  },

};


</script>
<style scoped>
  .ace-editor-wrapper {
    margin-bottom: 5rem;
    width: 50%;
  }
  .error-container {
    height: 2rem;
    width: 100%;
    color: white;
    background-color: #e74c3c;
    padding-left: 20px;
    border-top-color: #e74c3c;
    border-top-width: 1px;
    border-top-style: solid;
    padding-top: 5px;
    margin-top: 1px;
    overflow-y: scroll;
    box-sizing: border-box;
  }
</style>
