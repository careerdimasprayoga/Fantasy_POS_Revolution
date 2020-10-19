import axios from 'axios'

export default {
  state: {
    orders: []
  },
  mutations: {
    pushDataOrder(state, payload) {
      state.orders = payload
    }
  },
  actions: {
    addOrders(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_URL}/order`, payload)
          .then(response => {
            resolve(response.data.msg)
          })
          .catch(error => {
            reject(error.response.data.msg)
          })
      })
    },
    getOrder(context, payload) {
      axios
        .get(`${process.env.VUE_APP_URL}/order`, payload)
        .then(response => {
          context.commit('pushDataOrder', response.data.data)
        })
        .catch(error => {
          reject(error.response.data.msg)
        })
    }
  },
  getters: {
    dataOrder(state) {
      return state.orders
    }
  }
}
