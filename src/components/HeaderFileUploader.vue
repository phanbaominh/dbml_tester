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
.filepond--file-info-main {
  font-size: 0.9em!important;
  margin-top: 0.2em;
}
.filepond--file-info-sub{
  display: none;
}

.file-info-hover:hover {
  cursor: pointer;
  text-decoration: underline;
  --text-opacity: 1;
  color: rgba(99, 179, 237, var(--text-opacity));
}

.file-info-error {
 --text-opacity: 1;
 color: rgba(245, 101, 101, var(--text-opacity));
 font-weight: bold;
}
</style>
