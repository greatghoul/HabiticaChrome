import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMoment from 'vue-moment'
import { VTooltip } from 'v-tooltip'
import PopupApp from '../components/PopupApp.vue'
import GroupView from '../components/GroupView.vue'
import TaskView from '../components/TaskView.vue'

Vue.use(VueRouter)
Vue.use(VueMoment)
Vue.directive('tooltip', VTooltip)

const routes = [
  { path: '/group/:id', component: GroupView, props: true },
  { path: '/tasks/:type', component: TaskView, props: true }
]

const router = new VueRouter({
  routes
})

new Vue({
  router,
  el: '#app',
  render: (h) => h(PopupApp)
})
