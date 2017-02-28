import Vue from 'vue';
import VueMoment from 'vue-moment';
import PopupApp from '../components/PopupApp.vue';

Vue.use(VueMoment);

new Vue({
  el: '#app',
  render: h => h(PopupApp)
})
