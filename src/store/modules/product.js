import axios from 'axios'

export default {
  state: {
    products: [],
    page: 1,
    limit: 6,
    totalProducts: 1
    // carts: []
  },
  mutations: {
    pushProducts(state, payload) {
      state.products = payload.data
    },
    pushChangePage(state, payload) {
      state.page = payload
    },
    pushTotalProducts(state, payload) {
      state.totalProducts = payload
    }
    // pushCart(state, payload) {
    //   state.carts = [...state.carts, payload]
    // }
  },
  actions: {
    getProducts(context, payload) {
      axios
        .get(
          `${process.env.VUE_APP_URL}/product?limit=${context.state.limit}&page=${context.state.page}`
        )
        .then(response => {
          context.commit('pushProducts', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    searchProducts(context, payload) {
      axios
        .get(`${process.env.VUE_APP_URL}/product/search?search=${payload}`)
        .then(response => {
          context.commit('pushProducts', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getTotalProducts(context, payload) {
      axios
        .get(`${process.env.VUE_APP_URL}/product/getTotalProducts`)
        .then(response => {
          context.commit('pushTotalProducts', response.data.data[0].total)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  getters: {
    dataProducts(state) {
      return state.products
    },
    dataTotalProducts(state) {
      return state.totalProducts
    }
    // dataCarts(state) {
    //   return state.carts
    // }
  }
}
