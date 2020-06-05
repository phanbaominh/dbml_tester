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
      :fileName="file.name"
      :initContent="file.content"
      :initOutput="file.output"
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
</style>
