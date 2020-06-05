import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    inputType: '',
    outputType: '',
    files: [],
    parsedFiles: [],
    nextId: 0,
  },
  mutations: {
    setInputType(state, type) {
      state.inputType = type;
    },
    setOutputType(state, type) {
      state.outputType = type;
    },
    pushFile(state, file) {
      state.files.push(file);
    },

    pushParsedFile(state, parsed) {
      parsed.id = state.nextId++; //eslint-disable-line
      state.parsedFiles.push(parsed);
    },

    removeFile(state, fileName) {
      const index = state.files.findIndex((file) => file.filename === fileName);
      state.files.splice(index, 1);
    },
  },
  actions: {
    async setFile({ commit }, file) {
      const fileText = await file.file.text();
      commit('pushFile', { name: file.filename, content: fileText });
    },
  },
  modules: {
  },
});
