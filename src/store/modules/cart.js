import axios from 'axios'

export default {
  state: {
    carts: [],
    dataTest: 'mipan'
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
      console.log(state.carts)
    }
  },
  actions: {},
  getters: {
    mipan(state) {
      return state.mipan
    }
  }
}
