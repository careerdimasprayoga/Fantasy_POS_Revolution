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
            <h5 class="card-title">Rp. 680.000</h5>
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
            <p class="card-text">Orders</p>
            <h5 class="card-title">52 Orders</h5>
            <p class="card-text">+5% Lastweek</p>
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
            <h5 class="card-title">Rp. 50.000.320</h5>
            <p class="card-text">+89% Lastyear</p>
          </div>
        </div>
      </b-col>
      <b-col xl="12">
        <div class="styleCard mt-3 rounded">
          <h4 class="mb-5 mt-1">Revenue</h4>
          <area-chart
            :data="{
              '2017-01-01': 2,
              '2017-01-02': 5,
              '2017-01-03': 0,
              '2017-01-04': 20,
              '2017-01-05': 3
            }"
          ></area-chart>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Header',
  data() {
    return {
      mipan: [
        {
          dates: new Date(2020, 10, 12),
          subtotals: 250000
        },
        {
          dates: new Date(2020, 10, 13),
          subtotals: 220000
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['dataChatThisMonth'])
  },
  methods: {
    ...mapActions(['getChartThisMonth'])
  },
  created() {
    this.getChartThisMonth()
    console.log(this.dataChatThisMonth)
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
</style>
