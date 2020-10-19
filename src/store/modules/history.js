import axios from 'axios'

export default {
  state: {
    chartThisMonth: []
  },
  mutations: {
    pushChartThisMonth(state, payload) {
      state.chartThisMonth = payload
    }
  },
  actions: {
    getChartThisMonth(context, payload) {
      axios
        .get(`${process.env.VUE_APP_URL}/order/this_month`)
        .then(response => {
          context.commit('pushChartThisMonth', response.data.data)
          // const setChart = response.data.data
          // for (let i = 0; i < setChart.length; i++) {
          //   context.state.chartThisMonth.push([
          //     setChart[i].dates,
          //     setChart[i].subtotals
          //   ])
          // }
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  getters: {
    dataChatThisMonth(state) {
      return state.chartThisMonth
    }
  }
}
