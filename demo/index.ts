import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import App from './App.vue';

Vue.use(VueCompositionApi);

const vm = new Vue({ el: '#app', render: (h) => h(App) });
