<template>
  <div class="mb-2">
    <header class="flex justify-between">
      <div class="menu">
        <BaseButton class ="mb-2 self-start" icon="arrow-up" @click="backToTop">
          Back to top
        </BaseButton>
        <div>
          <div class="flex">
            <DownloadButton @click="downloadInputFile">
              Input
            </DownloadButton>
            <TypeSelect v-model="inputType" :formats="formats">
              Select input type
            </TypeSelect>
          </div>
        </div>
      </div>
      <div class="text-center text-3xl" :class="{'file-info-error': parseError}">
        {{file.name}}
      </div>
      <div class="menu">
        <ShowHide
          class="self-end mb-2"
          @show="isHidden = false"
          @hide="isHidden = true"
        />
        <div>
          <div class="flex">
            <TypeSelect v-model="outputType">
              Select output type
            </TypeSelect>
            <DownloadButton @click="downloadOutputFile">
              Output
            </DownloadButton>
          </div>
      </div>
      </div>
    </header>
    <div class="flex justify-between" :class="{hidden: isHidden}">
      <div class="ace-editor-wrapper">
        <AceEditor
          :id="inputEditorId"
          v-model="content"
          @init="editorInit"
          @input="editorChange"
          v-bind:lang="inputLang"
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
        <OutputView
          :id="outputEditorId"
          :lang="outputLang"
          :output="output"
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
import 'brace/mode/ruby';
import 'brace/ext/language_tools';
import 'brace/ext/searchbox';
import './dbml_mode';
import './holistics_theme';
import { Parser, ModelExporter } from '@dbml/core';
import { mapState } from 'vuex';
import commonFormats from '../../constants';
import BaseButton from '../BaseButton.vue';
import DownloadButton from '../BaseButtonDownload.vue';
import OutputView from './OutputView.vue';
import TypeSelect from '../BaseFileTypeSelect.vue';
import ShowHide from '../BaseShowHide.vue';

let scrollIntoView;
const formats = {
  ...commonFormats,
  schemarb: {
    value: 'schemarb',
    name: 'schema.rb',
    editorLang: 'ruby',
    fileExtension: 'rb',
    uploadFile: 'schema.rb',
  },
};
export default {
  name: 'ResultView',
  components: {
    AceEditor,
    BaseButton,
    OutputView,
    TypeSelect,
    ShowHide,
    DownloadButton,
  },
  props: {
    file: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return ({
      isHidden: false,
      editorOptions: {
        tabSize: 2,
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        hScrollBarAlwaysVisible: false,
        vScrollBarAlwaysVisible: false,
        fontSize: 14,
        minLines: 40,
        maxLines: 40,
        showPrintMargin: false,
        fontFamily: 'monospace',
        autoScrollEditorIntoView: true,
      },
      content: this.file.content,
      output: '',
      parseError: '',
      inputType: '',
      outputType: '',
      formats,
    });
  },
  computed: {
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
    inputLang() {
      return (this.formats[this.inputType] || {}).editorLang || 'text';
    },
    outputLang() {
      return (this.formats[this.outputType] || {}).editorLang || 'text';
    },
    ...mapState([
      'downloadAllType',
      'isParsedAll',
    ]),
    ...mapState({
      gInputType: 'inputType',
      gOutputType: 'outputType',
    }),
  },
  watch: {
    gInputType(storeVal) {
      this.inputType = storeVal;
    },
    gOutputType(storeVal) {
      this.outputType = storeVal;
    },
    inputType() {
      this.parseDirectly(this.content);
    },
    outputType() {
      this.parseDirectly(this.content);
    },
    parseError(error) {
      const editor = ace.edit(this.inputEditorId);
      const editorSession = editor.getSession();
      const fileElement = this.getFileInfoEle();
      const hasErrorClass = fileElement.hasClass('file-info-error');
      if ((error && !hasErrorClass) || (!error && hasErrorClass)) {
        fileElement.toggleClass('file-info-error');
      }
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
    'file.content': function (content) {
      this.content = content;
    },
    isParsedAll(isParsed) {
      if (isParsed) {
        this.$store.commit('increaseParseCount');
        this.parseDirectly(this.content);
      }
    },
    downloadAllType(type) {
      if (type) {
        const isInput = type === 'input';
        const file = {
          name: isInput ? this.file.name : this.getOutputFileName(),
          content: isInput ? this.content : this.output,
        };
        this.$store.dispatch('setOutputFile', file);
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
          const database = Parser.parse(this.content, this.inputType);
          this.output = ModelExporter.export(database, this.outputType, false);
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
          addedPart = formats[this.outputType].fileExtension;
        } else if (addedPart === 'in.') {
          addedPart = 'out.';
        }
        filename += addedPart;
      });
      return filename;
    },
    createDownloadLink(content, fileName) {
      const element = document.createElement('a');
      $(element).attr('href', `data:text/plain;charset=utf-8,${encodeURIComponent(content)}`);
      $(element).attr('download', fileName);
      $(element).css('display', 'none');
      $(document.body).append(element);
      element.click();
      $(element).remove();
    },
    downloadOutputFile() {
      this.createDownloadLink(this.output, this.getOutputFileName());
    },
    downloadInputFile() {
      this.createDownloadLink(this.content, this.file.name);
    },
    backToTop() {
      $('.filepond')[0].scrollIntoView();
    },
  },

};


</script>
<style scoped>
  .ace-editor-wrapper {
    width: 50%;
  }
  .error-container {
    height: 4rem;
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
  .menu {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>
