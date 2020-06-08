import Vue from 'vue';

import '@/assets/styles/main.css';
import { library as faLibrary } from '@fortawesome/fontawesome-svg-core';
import {
  faDownload, faCaretDown, faCaretUp, faArrowUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import store from './store';

faLibrary.add(faDownload, faCaretDown, faCaretUp, faArrowUp);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
