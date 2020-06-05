<template>
    <header>
        <button>Upload files...</button>
        <FilePond
        class="hidden"
        name="test"
        ref="pond"
        label-idle="Drop files here..."
        v-bind:allow-multiple="true"
        v-on:updatefiles="handleUpdateFile"/>
        <TypeSelect :isInput="true"/>
        <TypeSelect :isInput="false"/>
    </header>
</template>
<script>
import vueFilePond from 'vue-filepond';
import 'filepond/dist/filepond.min.css';
import TypeSelect from './HeaderFileTypeSelect.vue';

const FilePond = vueFilePond();

export default {
  name: 'Header',
  methods: {
    handleUpdateFile(files) {
      if (files) console.log(files);
      // console.log(files[0].file.text());
    },
  },
  components: {
    FilePond,
    TypeSelect,
  },
};
</script>

<style scoped>
 .filepond--wrapper {
   width: 50%;
 }
</style>
