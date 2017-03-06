import Vue from 'vue'
import VueRouter from 'vue-router'

import TodoApp from '../view/TodoApp.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/:visibility', component: TodoApp, props: true },
    { path: '/', redirect: '/all' }
  ]
})
