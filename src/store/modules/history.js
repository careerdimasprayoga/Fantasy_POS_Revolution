import axios from 'axios'

export default {
  state: {
    chartThisMonth: '',
    todayIncome: '',
    totalOrder: '',
    yearIncome: ''
  },
  mutations: {
    pushChartThisMonth(state, payload) {
      state.chartThisMonth = payload
    },
    pushCardTodayIncome(state, payload) {
      state.todayIncome = payload
    },
    pushCardTotalOrder(state, payload) {
      state.totalOrder = payload
    },
    pushCardYearIncome(state, payload) {
      state.yearIncome = payload
    }
  },
  actions: {
    getChartThisMonth(context, payload) {
      axios
        .get(`${process.env.VUE_APP_URL}/order/this_month`)
        .then(response => {
          context.commit('pushChartThisMonth', response.data.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getCardTodayIncome(context, payload) {
      axios
        .get(`${process.env.VUE_APP_URL}/order/today_income`)
        .then(response => {
          context.commit('pushCardTodayIncome', response.data.data[0].subtotals)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getCardTotalOrder(context, payload) {
      axios
        .get(`${process.env.VUE_APP_URL}/order/total_order`)
        .then(response => {
          context.commit('pushCardTotalOrder', response.data.data[0].totals)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getCardYearIncome(context, payload) {
      axios
        .get(`${process.env.VUE_APP_URL}/order/total_yearIncome`)
        .then(response => {
          context.commit('pushCardYearIncome', response.data.data[0].subtotals)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  getters: {
    dataChatThisMonth(state) {
      return state.chartThisMonth
    },
    dataTodayIncome(state) {
      return state.todayIncome
    },
    dataTotalOrder(state) {
      return state.totalOrder
    },
    dataYearIncome(state) {
      return state.yearIncome
    }
  }
}
