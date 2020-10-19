import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Main from '../views/Main.vue'
import Manage from '../views/Manage.vue'
import History from '../views/History.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/main',
    name: 'Main',
    component: Main,
    meta: { requiresAuth: true }
  },
  {
    path: '/manage',
    name: 'Manage',
    component: Manage,
    meta: { requiresAdmin: true }
  },
  {
    path: '/history',
    name: 'History',
    component: History,
    meta: { requiresAdmin: true }
  },
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { requiresVisitor: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresVisitor: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLogin) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresAdmin)) {
    if (store.getters.isAdmin === 1) {
      next({
        path: '/main'
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.isLogin) {
      next({
        path: '/main'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
