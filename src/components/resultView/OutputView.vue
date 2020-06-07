<template>
    <AceEditor
    :id="editorId"
    :value="output"
    v-bind:lang="lang"
    v-bind:options="editorOptions"
    theme="holistics"
    ref="aceEditor"
    class="editor"
    />
</template>
<script>
import AceEditor from 'vue2-ace-editor';
import 'brace';
import 'brace/mode/pgsql'; // language
import 'brace/mode/mysql';
import 'brace/mode/sqlserver';
import 'brace/mode/json';
import 'brace/mode/ruby';
import 'brace/ext/searchbox';
import './dbml_mode';
import './holistics_theme';

export default {
  components: {
    AceEditor,
  },
  props: {
    editorId: {
      type: String,
      default: '',
    },
    lang: {
      type: String,
      default: 'text',
    },
    output: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      editorOptions: {
        tabSize: 2,
        hScrollBarAlwaysVisible: false,
        vScrollBarAlwaysVisible: false,
        fontSize: 14,
        maxLines: 40,
        showPrintMargin: false,
        fontFamily: 'monospace',
        readOnly: true,
      },
    };
  },
};
</script>
