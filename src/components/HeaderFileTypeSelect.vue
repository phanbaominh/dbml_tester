<template>
    <BaseTypeSelect v-model="type" @input="setType">
      {{placeholder}}
    </BaseTypeSelect>
</template>
<script>
import BaseTypeSelect from './BaseFileTypeSelect.vue';

export default {
  name: 'HeaderFileTypeSelect',
  data() {
    return {
      type: '',
    };
  },
  props: {
    isInput: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    placeholder() {
      return this.isInput ? 'Select input type' : 'Select output type';
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
