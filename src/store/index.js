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
    fileCount: 0,
    zip: new JSZip(),
    downloadAllType: null,
    parseCount: 0,
    isParsedAll: false,
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

    addFileToFolder(state, file) {
      state.zip.folder(state.downloadAllType).file(file.name, file.content);
      state.fileCount += 1;
    },
    removeFile(state, id) {
      const index = state.files.findIndex((file) => file.id === id);
      state.files.splice(index, 1);
    },
    setParseAll(state) {
      state.isParsedAll = true;
    },
    increaseParseCount(state) {
      state.parseCount += 1;
      if (state.parseCount === state.files.length) {
        state.parseCount = 0;
        state.isParsedAll = false;
      }
    },
    setDownloadAll(state, type) {
      state.downloadAllType = type;
    },
    resetDownloadStatus(state) {
      state.downloadAllType = null;
      state.fileCount = 0;
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

    async setOutputFile({ state, commit }, file) {
      commit('addFileToFolder', file);
      if (state.fileCount === state.files.length) {
        const base64zip = await state.zip.generateAsync({ type: 'base64' });
        const element = document.createElement('a');
        $(element).attr('href', `data:application/zip;base64,${base64zip}`);
        $(element).attr('download', `${state.downloadAllType}.zip`);
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
