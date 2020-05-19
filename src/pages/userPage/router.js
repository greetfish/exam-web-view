import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/examList',
      name: 'examList',
      component: () => import('./views/examList.vue')
    },
    {
      path: '/examing',
      name: 'examing',
      component: () => import('./views/examing.vue')
    },
    {
      path: '/admin',
      beforeEnter (to, from, bext) {
        window.location = '/admin.html'
      }
    },
    {
      path: '/home',
      beforeEnter (to, from, bext) {
        window.location = '/admin.html'
      }
    },
    {
      path: '/courseManage',
      beforeEnter (to, from, bext) {
        window.location = '/admin.html'
      }
    },
    {
      path: '/examingControl',
      beforeEnter (to, from, bext) {
        window.location = '/admin.html'
      }
    },
    {
      path: '/paperArchive',
      beforeEnter (to, from, bext) {
        window.location = '/admin.html'
      }
    },
    {
      path: '/memberArchive',
      beforeEnter (to, from, bext) {
        window.location = '/admin.html'
      }
    },
    {
      path: '/memberReview',
      beforeEnter (to, from, bext) {
        window.location = '/admin.html'
      }
    },
    {
      path: '/paperForExam',
      beforeEnter (to, from, bext) {
        window.location = '/admin.html'
      }
    },
    {
      path: '/paperGenerate',
      beforeEnter (to, from, bext) {
        window.location = '/admin.html'
      }
    },
    {
      path: '/scoreExport',
      beforeEnter (to, from, bext) {
        window.location = '/admin.html'
      }
    },
    {
      path: '/controlExamMember',
      beforeEnter (to, from, bext) {
        window.location = '/admin.html'
      }
    }
  ]
})
