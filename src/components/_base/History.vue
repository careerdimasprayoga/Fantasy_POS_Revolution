<template>
  <b-container fluid class="background">
    <b-row>
      <b-col xl="4">
        <div class="card mt-3">
          <div
            class="card-body rounded"
            style="background-image: linear-gradient(120deg, #fbb2b4, white)"
          >
            <p class="card-text">Today's Income</p>
            <h5 class="card-title" v-if="this.dataTodayIncome === null || ''">
              Rp. 0
            </h5>
            <h5 class="card-title" v-else>
              Rp.
              {{
                this.dataTodayIncome
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
              }}
            </h5>
            <p class="card-text">+54% Yesterday</p>
          </div>
        </div>
      </b-col>
      <b-col xl="4">
        <div class="card mt-3">
          <div
            class="card-body rounded"
            style="background-image: linear-gradient(120deg, #29dfff, white)"
          >
            <!-- <p class="card-text">Today's Order</p> -->
            <p class="card-text">Total's Order</p>
            <h5 class="card-title">Total {{ this.dataTotalOrder }}</h5>
            <p class="card-text">+5% Yesterday</p>
          </div>
        </div>
      </b-col>
      <b-col xl="4">
        <div class="card mt-3" style="border-radius: 50px">
          <div
            class="card-body rounded"
            style="background-image: linear-gradient(120deg, #ab84c8, white)"
          >
            <p class="card-text">This Year's Income</p>
            <h5 class="card-title">
              Rp.
              {{
                this.dataYearIncome
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
              }}
            </h5>
            <p class="card-text">+89% Lastyear</p>
          </div>
        </div>
      </b-col>
      <b-col xl="12">
        <div class="styleCard mt-3 rounded">
          <h4 class="mb-5 mt-1">Revenue</h4>
          <area-chart :data="dataChart"></area-chart>
        </div>
      </b-col>
      <b-col xl="12">
        <div class="styleCard mt-3 rounded">
          <h4 class="mb-5 mt-1">Recent Order</h4>
          <b-table small :fields="fields" :items="dataOrder" responsive="sm">
          </b-table>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Header',
  data() {
    return {
      dataChart: {},
      fields: [
        { key: 'invoices', label: 'Invoice' },
        { key: 'cashier', label: 'Cashier' },
        { key: 'dates', label: 'Date' },
        { key: 'names', label: 'Order' },
        { key: 'subtotals', label: 'Amount' }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'dataChatThisMonth',
      'dataTodayIncome',
      'dataTotalOrder',
      'dataYearIncome',
      'dataOrder'
    ])
  },
  methods: {
    ...mapActions([
      'getChartThisMonth',
      'getCardTodayIncome',
      'getCardTotalOrder',
      'getCardTotalOrder',
      'getCardYearIncome',
      'getOrder'
    ]),
    chartConvert() {
      let result = {}
      for (let i = 0; i < this.dataChatThisMonth.length; i++) {
        result[this.dataChatThisMonth[i].dates] = this.dataChatThisMonth[
          i
        ].subtotals
      }
      this.dataChart = result
    }
  },
  created() {
    this.getChartThisMonth()
    this.getCardTodayIncome()
    this.getCardTotalOrder()
    this.getCardTotalOrder()
    this.getCardYearIncome()
    this.chartConvert()
    this.getOrder()
  }
}
</script>

<style scoped>
@import '../../assets/css/fonts.css';
.background {
  background-color: rgba(190, 195, 202, 0.3);
}
.styleCard {
  background-color: white;
  padding: 20px;
}
.paginationStyle {
  margin-left: 40%;
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>
