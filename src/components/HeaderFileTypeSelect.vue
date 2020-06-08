<template>
    <BaseTypeSelect v-model="type" @input="setType" :formats="isInput ? formats : null">
      <slot></slot>
    </BaseTypeSelect>
</template>
<script>
import BaseTypeSelect from './BaseFileTypeSelect.vue';
import commonFormats from '../constants';

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
  name: 'HeaderFileTypeSelect',
  data() {
    return {
      type: '',
      formats,
    };
  },
  props: {
    isInput: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    setType() {
      if (this.isInput) {
        this.$store.commit('setInputType', this.type);
      } else {
        this.$store.commit('setOutputType', this.type);
      }
    },
  },
  components: {
    BaseTypeSelect,
  },
};
</script>
