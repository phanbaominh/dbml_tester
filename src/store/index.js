import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    inputType: '',
    outputType: '',
  },
  mutations: {
    setInputType(state, type) {
      state.inputType = type;
    },
    setOutputType(state, type) {
      state.outputType = type;
    },
  },
  actions: {
  },
  modules: {
  },
});
