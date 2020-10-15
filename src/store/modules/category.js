import axios from 'axios'

export default {
  state: {
    categorys: []
  },
  mutations: {
    pushCategorys(state, payload) {
      state.categorys = payload
    }
  },
  actions: {
    getCategorys(context, payload) {
      axios
        .get(`${process.env.VUE_APP_URL}/category`)
        .then(response => {
          context.commit('pushCategorys', response.data.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  getters: {
    dataCategorys(state) {
      return state.categorys
    }
  }
}
