import axios from 'axios'

export default {
  state: {
    carts: []
  },
  mutations: {
    pushCarts(state, payload) {
      const fixedData = [...state.carts, payload]
      const addedItem = fixedData.find(
        item => item.product_id === payload.product_id
      )
      const existItem = state.carts.find(
        item => item.product_id === payload.product_id
      )
      if (existItem) {
        addedItem.qty += 1
      } else {
        state.carts = [...state.carts, payload]
      }
    },
    resetCarts(state, payload) {
      state.carts = []
    },
    qtyPlusCarts(state, payload) {
      const incrementData = state.carts.find(
        value => value.product_id === payload.product_id
      )
      incrementData.qty += 1
      incrementData.price = payload.product_price * payload.qty
      incrementData.ppn = (payload.price * 5) / 100
    },
    qtyMinCarts(state, payload) {
      const incrementData = state.carts.find(
        value => value.product_id === payload.product_id
      )
      incrementData.qty -= 1
      if (incrementData.qty < 1) {
        state.carts = state.carts.filter(
          item => item.product_id !== incrementData.product_id
        )
      }
    }
  },
  actions: {},
  getters: {
    getCart(state) {
      return state.carts
    }
  }
}
