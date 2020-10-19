import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './modules/auth'
import Product from './modules/product'
import Category from './modules/category'
import Cart from './modules/cart'
import Order from './modules/order'
import History from './modules/history'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: 'Fantasy POS Revolution'
  },
  mutations: {},
  actions: {},
  modules: {
    Auth,
    Product,
    Category,
    Cart,
    Order,
    History
  },
  plugins: [
    createPersistedState({
      path: ['Auth.user'],
      storage: window.sessionStorage
    })
  ]
})
