import Vue from 'vue';
import App from './components/App.vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import { routes } from './components/route';
import { store } from './components/store';

Vue.use(VueResource);
Vue.use(VueRouter);

export const eventBus = new Vue();

const router = new VueRouter({
  // mode: 'history',
  routes
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})
