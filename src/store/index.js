import Vue from 'vue';
import Vuex from 'vuex';
import JSZip from 'jszip';
import $ from 'jquery';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    inputType: '',
    outputType: '',
    files: [],
    outputCount: 0,
    zip: new JSZip(),
    isDownloadAll: false,
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
      Vue.set(state.files, payload.index, payload.value);
    },

    setParsedState(state, id) {
      const changedFile = state.files.find((file) => file.id === id);
      // console.log(changedFile);
      changedFile.isParsed = !changedFile.isParsed;
    },
    addFileToFolder(state, output) {
      state.zip.folder('output').file(output.name, output.content);
      state.outputCount += 1;
    },
    removeFile(state, id) {
      const index = state.files.findIndex((file) => file.id === id);
      state.files.splice(index, 1);
    },
    setDownloadAll(state) {
      state.isDownloadAll = !state.isDownloadAll;
    },
    resetDownloadStatus(state) {
      state.isDownloadAll = false;
      state.outputCount = 0;
      state.zip = new JSZip();
    },
  },
  actions: {
    async setFile({ commit }, file) {
      const fileText = await file.file.text();
      commit('pushFile', {
        name: file.filename,
        content: fileText,
        id: file.id,
        isParsed: false,
      });
    },

    async setOutputFile({ state, commit }, output) {
      commit('addFileToFolder', output);
      if (state.outputCount === state.files.length) {
        const base64zip = await state.zip.generateAsync({ type: 'base64' });
        const element = document.createElement('a');
        $(element).attr('href', `data:application/zip;base64,${base64zip}`);
        $(element).attr('download', 'output.zip');
        $(element).css('display', 'none');
        $(document.body).append(element);
        element.click();
        $(element).remove();
        commit('resetDownloadStatus');
      }
    },
  },
  modules: {
  },
});
