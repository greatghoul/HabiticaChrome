import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMoment from 'vue-moment';
import PopupApp from '../components/PopupApp.vue';
import GroupView from '../components/GroupView.vue';

Vue.use(VueRouter);
Vue.use(VueMoment);

const routes = [
  { path: '/group/:id', component: GroupView, props: true }
];

const router = new VueRouter({
  routes
});

new Vue({
  router,
  el: '#app',
  render: (h) => h(PopupApp)
});
