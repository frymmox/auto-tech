import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('@/views/index.vue')
    },
    {
      path: '/slider',
      component: () => import('@/views/slider.vue')
    },
    {
      path: '/users',
      component: () => import('@/views/users.vue')
    },
    {
      path: '/users/user:id',
      name: 'user',
      component: () => import('@/views/user.vue')
    }
  ]
})
