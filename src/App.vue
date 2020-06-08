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
body {
  background-color: #373C44;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #373C44;
}
header {
  background-color: #1c2128;;
  color: #eee;
  padding: 10px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.15);
  z-index: 100;
  font-family: 'Open Sans';
  font-size: 15px;
}

header select {
  background-color: #373c44;
}

/* ScrollBar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
/* Track */
::-webkit-scrollbar-track {
    background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #555;
    border-radius: 8px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #999 !important;
}
</style>
