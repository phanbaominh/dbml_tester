<template>
    <FilePond
    name="test"
    ref="pond"
    class="filepond"
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
      this.$store.commit('removeFile', file.id);
    },
  },
  components: {
    FilePond,
  },
};
</script>
<style>
.filepond--panel-root {
  background-color: #1c2128;
  border-radius: 0;
}

.filepond--drop-label {
  color: #eee;
}
.filepond--item-panel {
    background-color: #373c44;
}
</style>
