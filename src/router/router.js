import Vue from 'vue'
import Router from 'vue-router'
import Interface from '../components/Interface'
import { createSessionToken, isLogged } from '../middlewares/auth'

Vue.use(Router)

const router = new Router ({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:[
    {
      path: '/login',
      beforeEnter: createSessionToken
    },
    {
      path: '/',
      component: Interface,
      beforeEnter: isLogged
    },
  ]
})

export default router