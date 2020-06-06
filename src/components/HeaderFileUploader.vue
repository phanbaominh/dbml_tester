<template>
    <FilePond
    name="test"
    ref="pond"
    label-idle="Drop files here..."
    v-bind:allow-multiple="true"
    v-on:addfile="onAddFile"
    v-on:removefile="onRemoveFile"
    />
</template>
<script>
import vueFilePond from 'vue-filepond';
import 'filepond/dist/filepond.min.css';

const FilePond = vueFilePond();
export default {
  methods: {
    onAddFile(error, file) {
      this.$store.dispatch('setFile', file);
    },

    onRemoveFile(error, file) {
      console.log(this.$el.querySelector(`#filepond--item-${file.id}`));
      this.$store.commit('removeFile', file.id);
    },
  },
  components: {
    FilePond,
  },
};
</script>
