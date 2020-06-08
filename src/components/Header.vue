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
            <HeaderButton icon="download" @click="downloadAll('input')">
              All Input
            </HeaderButton>
            <HeaderButton icon="download" @click="downloadAll('output')">
              All Output
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
      if (this.$store.state.files.length > 0) this.$store.commit('setParseAll');
    },
    downloadAll(type) {
      this.$store.commit('setDownloadAll', type);
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
