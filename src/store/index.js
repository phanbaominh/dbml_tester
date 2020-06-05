import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    inputType: '',
    outputType: '',
    files: [],
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
