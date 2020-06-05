<template>
    <header>
        <div id="header-buttons-container" class="flex items-start">
            <FileUploader/>
            <TypeSelect
            :class="{error: isEmptyInput}"
            :isInput="true"
            @change.native="isEmptyInput=false"
            />
            <TypeSelect
            :class="{error: isEmptyOutput}"
            :isInput="false"
            @change.native="isEmptyOutput=false"
            />
            <button @click="onClickParse"> Parse! </button>
        </div>
    </header>
</template>
<script>

import { Parser, ModelExporter } from '@dbml/core';
import TypeSelect from './HeaderFileTypeSelect.vue';
import FileUploader from './HeaderFileUploader.vue';

export default {
  name: 'Header',
  data() {
    return {
      isEmptyInput: false,
      isEmptyOutput: false,
    };
  },
  methods: {
    onClickParse() {
      const s = this.$store.state;
      if (!s.inputType) {
        this.isEmptyInput = true;
      }
      if (!s.outputType) {
        this.isEmptyOutput = true;
      }
      if (this.isEmptyOutput || this.isEmptyInput) return;
      s.files.forEach((file) => {
        try {
          const database = Parser.parse(file.content, s.inputType);
          const parsed = ModelExporter.export(database.normalize(), s.outputType);
          this.$store.commit('pushParsedFile', {
            ...file,
            output: parsed,
          });
        } catch (err) {
          this.$store.commit('pushParsedFile', {
            ...file,
            output: err.message,
            error: true,
          });
        }
      });
    },
  },
  components: {
    TypeSelect,
    FileUploader,
  },
};
</script>

<style scoped>
 .filepond--wrapper {
   width: 20%;
 }

.error {
    @apply border-solid border-red-400 border-2;
}

#header-buttons-container > *{
    @apply ml-4 inline-block;
}
</style>
