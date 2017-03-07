'use strict'

import Vue from 'vue'
import VueRouter from 'vue-router'

import TodoApp from '../view/todo-app.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {path: '/:visibility', component: TodoApp, props: true},
    {path: '/', redirect: '/all'}
  ]
})
