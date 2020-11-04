import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Main from '../views/Main.vue'
import Manage from '../views/Manage.vue'
import History from '../views/History.vue'
import ManageProduct from '../views/ManageProduct.vue'
import ManageCategory from '../views/ManageCategory.vue'
import Auth from '../views/Auth.vue'
import Regist from '../views/Regist.vue'

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
    path: '/manage_product',
    name: 'ManageProduct',
    component: ManageProduct,
    meta: { requiresAdmin: true }
  },
  {
    path: '/manage_category',
    name: 'ManageCategory',
    component: ManageCategory,
    meta: { requiresAdmin: true }
  },
  {
    path: '/history',
    name: 'History',
    component: History,
    meta: { requiresAdmin: true }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    meta: { requiresVisitor: true }
  },
  {
    path: '/regist',
    name: 'Regist',
    component: Regist,
    meta: { requiresVisitor: true }
  },
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
        path: '/auth'
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
