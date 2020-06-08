<template>
    <div class="flex items-start">
      <FileUploader/>
      <header>
        <div id="header-buttons-container" class="flex items-center">
            <HeaderTypeSelect
              @change.native="parseAll(true)"
              :isInput="true"
            >
              Select input type
            </HeaderTypeSelect>
            <HeaderTypeSelect
              :isInput="false"
              @change.native="parseAll(false)"
            >
              Select output type
            </HeaderTypeSelect>
            <DownloadButton
              @click="downloadAll('input')"
              :isDownloading="isDownloadingInput"
            >
              All Input
            </DownloadButton>
            <DownloadButton
              @click="downloadAll('output')"
              :isDownloading="isDownloadingOutput"
            >
              All Output
            </DownloadButton>
            <DownloadButton>
              Test
            </DownloadButton>
        </div>
      </header>
    </div>
</template>
<script>

import HeaderTypeSelect from './HeaderFileTypeSelect.vue';
import FileUploader from './HeaderFileUploader.vue';
import DownloadButton from './BaseButtonDownload.vue';

export default {
  name: 'Header',
  data() {
    return {
      isEmptyInput: true,
      isEmptyOutput: true,
    };
  },
  computed: {
    isDownloadingInput() {
      const { state } = this.$store;
      return state.downloadAllType === 'input' && Boolean(state.downloadAllType);
    },
    isDownloadingOutput() {
      const { state } = this.$store;
      return state.downloadAllType === 'output' && Boolean(state.downloadAllType);
    },
  },
  methods: {
    parseAll(isInputType) {
      if (isInputType) {
        this.isEmptyInput = false;
      } else {
        this.isEmptyOutput = false;
      }
      if (this.isEmptyOutput || this.isEmptyInput) return;
      if (this.$store.state.files.length > 0) this.$store.commit('setParseAll');
    },
    downloadAll(type) {
      this.$store.commit('setDownloadAll', type);
    },
  },
  components: {
    HeaderTypeSelect,
    FileUploader,
    DownloadButton,
  },
};
</script>

<style scoped>
.filepond--wrapper {
  width: 20%;
}

#header-buttons-container > *{
  margin-left: 1rem;
}

</style>
