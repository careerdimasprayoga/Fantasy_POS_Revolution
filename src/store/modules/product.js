import axios from 'axios'

export default {
  state: {
    products: [],
    idProducts: 1,
    page: 1,
    limit: 6,
    totalProducts: 1
  },
  mutations: {
    pushProducts (state, payload) {
      state.products = payload.data
    },
    pushChangePage (state, payload) {
      state.page = payload
    },
    pushTotalProducts (state, payload) {
      state.totalProducts = payload
    },
    pushSendIdProducts (state, payload) {
      state.idProducts = payload
    }
  },
  actions: {
    getProducts (context, payload) {
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
    getProductsManage (context, payload) {
      axios
        .get(
          `${process.env.VUE_APP_URL}/product/product_manage?limit=${context.state.limit}&page=${context.state.page}`
        )
        .then(response => {
          context.commit('pushProducts', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    searchProducts (context, payload) {
      axios
        .get(`${process.env.VUE_APP_URL}/product/search?search=${payload}`)
        .then(response => {
          context.commit('pushProducts', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    sortProducts (context, payload) {
      axios
        .get(`${process.env.VUE_APP_URL}/product/sort?sort=${payload}`)
        .then(response => {
          context.commit('pushProducts', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getTotalProducts (context, payload) {
      axios
        .get(`${process.env.VUE_APP_URL}/product/getTotalProducts`)
        .then(response => {
          context.commit('pushTotalProducts', response.data.data[0].total)
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteProducts (context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`${process.env.VUE_APP_URL}/product/${payload}`)
          .then(response => {
            resolve(response.data.msg)
          })
          .catch(error => {
            reject(error.response.data.msg)
          })
      })
    },
    addProducts (context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_URL}/product`, payload)
          .then(response => {
            resolve(response.data.msg)
          })
          .catch(error => {
            reject(error.response.data.msg)
          })
      })
    },
    editProducts (context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `${process.env.VUE_APP_URL}/product/${context.state.idProducts}`,
            payload
          )
          .then(response => {
            resolve(response.data.msg)
          })
          .catch(error => {
            reject(error.response.data.msg)
          })
      })
    }
  },
  getters: {
    dataProducts (state) {
      return state.products
    },
    dataTotalProducts (state) {
      return state.totalProducts
    }
  }
}
