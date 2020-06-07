<template>
  <div id="app" class="project-view-container h-screen bg-white border-l border-solid">
    <Header/>
    <!--DiagramView
      class="hidden"
      :database="database"
    /-->
    <ResultView
      v-for="file in files"
      :key="file.id"
      :file="file"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Header from './components/Header.vue';
import ResultView from './components/resultView/ResultView.vue';
import '@holistics/dbrender/dist/dbrender.css';


export default {
  name: 'App',
  components: {
    // DiagramView,
    ResultView,
    Header,
  },
  computed: {
    ...mapState([
      'files',
    ]),
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.file-info-hover:hover {
  @apply underline text-blue-400 cursor-pointer;
}

.file-info-error {
  color: red;
}
</style>
