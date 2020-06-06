<template>
  <div>
    <div class="text-center text-5xl">{{fileName}}</div>
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
          ({{parseError.row + 1}}:{{parseError.column}}) {{parseError.text}}
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
    fileId: {
      type: String,
      default: '',
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
    inputEditorId() {
      return `ace-input-editor-${this.fileId}`;
    },
    outputEditorId() {
      return `ace-output-editor-${this.fileId}`;
    },
  },
  watch: {
    parseError(error) {
      const editor = ace.edit(this.inputEditorId);
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
  updated() {
    const editor = ace.edit(this.inputEditorId);
    editor.resize();
    if (this.parseError) {
      editor.scrollToLine(this.parseError.row, true, true);
    }
  },
  mounted() {
    ace.edit(this.outputEditorId).setReadOnly(true);
  },
  methods: {
    editorInit() {
      console.log('enabled!');
    },
    // eslint-disable-next-line no-unused-vars
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
