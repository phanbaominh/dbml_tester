import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    inputType: '',
    outputType: '',
    files: [],
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

    pushParsedFile(state, payload) {
      state.files = state.files.map((file, index) => {
        let mappedValue = file;
        if (index === payload.index) {
          mappedValue = payload.value;
        }
        return mappedValue;
      });
    },

    removeFile(state, id) {
      const index = state.files.findIndex((file) => file.id === id);
      state.files.splice(index, 1);
    },
  },
  actions: {
    async setFile({ commit }, file) {
      const fileText = await file.file.text();
      commit('pushFile', { name: file.filename, content: fileText, id: file.id });
    },
  },
  modules: {
  },
});
