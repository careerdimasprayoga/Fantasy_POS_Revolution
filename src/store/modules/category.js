import axios from 'axios'

export default {
  state: {
    categorys: [],
    idCategory: ''
  },
  mutations: {
    pushCategorys (state, payload) {
      state.categorys = payload
    },
    pushSendIdCategorys (state, payload) {
      state.idCategory = payload
    }
  },
  actions: {
    getCategorys (context, payload) {
      axios
        .get(`${process.env.VUE_APP_URL}/category`)
        .then(response => {
          context.commit('pushCategorys', response.data.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    addCategorys (context, payload) {
      return new Promise((resolve, reject) => {
        console.log(payload)
        axios
          .post(`${process.env.VUE_APP_URL}/category`, payload)
          .then(response => {
            resolve(response.data.msg)
          })
          .catch(error => {
            reject(error.response.data.msg)
          })
      })
    },
    deleteCategorys (context, payload) {
      return new Promise((resolve, reject) => {
        console.log(payload)
        axios
          .delete(`${process.env.VUE_APP_URL}/category/${payload}`)
          .then(response => {
            resolve(response.data.msg)
          })
          .catch(error => {
            reject(error.response.data.msg)
          })
      })
    },
    editCategorys (context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `${process.env.VUE_APP_URL}/category/${context.state.idCategory}`, payload
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
    dataCategorys (state) {
      return state.categorys
    }
  }
}
