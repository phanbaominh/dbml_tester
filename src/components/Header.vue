<template>
    <div class="flex items-start">
      <FileUploader/>
      <header>
        <div id="header-buttons-container" class="flex items-center">
            <TypeSelect
            :isInput="true"
            @change.native="parseAll(true)"
            />
            <TypeSelect
            :isInput="false"
            @change.native="parseAll(false)"
            />
            <HeaderButton icon="download" @click.native="downloadAll">
              Download All Output
            </HeaderButton>
        </div>
      </header>
    </div>
</template>
<script>

import TypeSelect from './HeaderFileTypeSelect.vue';
import FileUploader from './HeaderFileUploader.vue';
import HeaderButton from './HeaderButton.vue';

export default {
  name: 'Header',
  data() {
    return {
      isEmptyInput: true,
      isEmptyOutput: true,
    };
  },
  methods: {
    parseAll(isInputType) {
      if (isInputType) {
        this.isEmptyInput = false;
      } else {
        this.isEmptyOutput = false;
      }
      if (this.isEmptyOutput || this.isEmptyInput) return;
      this.$store.commit('setParseAll');
    },
    downloadAll() {
      this.$store.commit('setDownloadAll');
    },
  },
  components: {
    TypeSelect,
    FileUploader,
    HeaderButton,
  },
};
</script>

<style scoped>
.filepond--wrapper {
  width: 20%;
}

#header-buttons-container > *{
  margin-left: 1rem;
  display: inline-block;
}

</style>
