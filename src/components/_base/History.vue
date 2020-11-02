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
            <h5 class="card-title" v-if="this.dataYearIncome === null || ''">
              Rp. 0
            </h5>
            <h5 class="card-title" v-else>
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
          <h4 class="mt-1">Revenue</h4>
          <b-button
            @click="refreshRevenue()"
            class="refresh"
            size="sm"
            variant="secondary"
          >
            <b-icon icon="arrow-repeat" font-scale="1.5"></b-icon
          ></b-button>
          <area-chart :data="dataChart"></area-chart>
        </div>
      </b-col>
      <b-col xl="12" class="mb-5">
        <div class="styleCard mt-3 rounded">
          <h4 class="mt-1">Recent Order</h4>
          <b-button
            @click="refreshOrder()"
            class="refreshOrder"
            size="sm"
            variant="secondary"
          >
            <b-icon icon="arrow-repeat" font-scale="1.5"></b-icon
          ></b-button>
          <b-table small :fields="fields" :items="dataOrder" responsive="md">
            <template v-slot:cell(invoices)="data">
              # {{ data.item.invoices }}
            </template>
            <template v-slot:cell(dates)="data">
              {{ data.item.dates | moment('DD MMMM YYYY, HH:mm:ss') }}
            </template>
            <template v-slot:cell(subtotals)="data">
              Rp.
              {{
                data.item.subtotals
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
              }}
            </template>
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
      this.dataChart = {}
      let result = {}
      for (let i = 0; i < this.dataChatThisMonth.length; i++) {
        result[this.dataChatThisMonth[i].dates] = this.dataChatThisMonth[
          i
        ].subtotals
      }
      this.dataChart = result
    },
    refreshRevenue() {
      this.getChartThisMonth()
      this.chartConvert()
    },
    refreshOrder() {
      this.getOrder()
      this.dataOrder()
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
.refresh {
  margin-left: 110px;
  margin-top: -65px;
  border-radius: 5px;
}
.refreshOrder {
  margin-left: 160px;
  margin-top: -65px;
  border-radius: 5px;
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
