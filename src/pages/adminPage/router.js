import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/',
      beforeEnter (to, from, bext) {
        window.location = '/'
      }
    },
    {
      path: '/courseManage',
      name: 'courseManage',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/courseManage.vue')
    },
    {
      path: '/examingControl',
      name: 'examingControl',
      component: () => import(/* webpackChunkName: "about" */ './views/examingControl.vue')
    },
    {
      path: '/paperArchive',
      name: 'paperArchive',
      component: () => import('./views/paperArchive.vue')
    },
    {
      path: '/memberArchive',
      name: 'memberArchive',
      component: () => import('./views/memberArchive.vue')
    },
    {
      path: '/memberReview',
      name: 'memberReview',
      component: () => import('./views/memberReview.vue')
    },
    {
      path: '/paperForExam',
      name: 'paperForExam',
      component: () => import('./views/paperForExam.vue')
    },
    {
      path: '/paperGenerate',
      name: 'paperGenerate',
      component: () => import('./views/paperGenerate.vue')
    },
    {
      path: '/controlExamMember',
      name: 'controlExamMember',
      component: () => import('./views/controlExamMember.vue')
    }
  ]
})
