<template>
  <b-row>
    <b-col
      sm="12"
      v-if="getterDataCarts === undefined || getterDataCarts.length > 0"
    >
      <b-container>
        <div style="height: 405px; overflow: auto">
          <div>
            <b-card
              img-src="https://picsum.photos/600/300/?image=306"
              img-alt="Cart Image"
              img-left
              class="styleCardImage mt-2"
              style="border: none"
              v-for="(item, index) in getterDataCarts"
              :key="index"
            >
              <b-card-text class="styleName">Kambing Hitam</b-card-text>

              <b-button variant="primary" class="cart-qty" size="sm"
                >-</b-button
              >
              <b-button variant="primary" size="sm" class="styleQty"
                >3</b-button
              >
              <b-button variant="primary" class="cart-qty" size="sm"
                >+</b-button
              >
            </b-card>
          </div>
        </div>
        <div>
          <b-row>
            <b-col xl="4" style="margin-top: 10px">
              <p>Total:</p>
            </b-col>
            <b-col xl="8" style="margin-top: 10px">
              <p class="text-right">Rp. 30.000 *</p>
            </b-col>
            <b-col xl="12">
              <b-button squared variant="info" size="md" style="width: 100%"
                >Checkout</b-button
              >
            </b-col>
            <b-col xl="12" style="margin-top: 10px">
              <b-button
                squared
                variant="danger"
                size="md"
                style="width: 100%"
                @click="resetCart()"
                >Cancel</b-button
              >
            </b-col>
          </b-row>
        </div>
      </b-container>
    </b-col>
    <b-col v-else>
      <div id="cartEmpty">
        <div class="text-center">
          <img
            src="../../assets/images/icons/food_sidebar.png"
            class="styleCartEmpty"
            md="12"
            sm="12"
            xs="12"
          />
          <p
            style="
              font-size: 25px;
              font-weight: bold;
              line-height: 10pt;
              margin-top: -20px;
            "
          >
            Your cart is empty
          </p>
          <p style="font-size: 15px; font-weight: bold; color: #cecece">
            Please add some items from the menu
          </p>
        </div>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Cart',
  data() {
    return {
      // cartssss: [],
      getterDataCarts: [1,2,3,4,5,6]
    }
  },
  methods: {
    resetCart() {
      this.cart = []
    }
  },
  computed: {
    // ...mapGetters({ getterDataCarts: 'dataCarts' })
  }
}
</script>

<style scoped>
#cart {
  background-color: #ffffff;
  height: 700px;
}
#cartEmpty {
  background-color: #ffffff;
  height: 700px;
}
.styleCartEmpty {
  width: 220px;
  margin-top: 100px;
}
.styleCardImage img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin: auto;
  margin-left: 10px;
}
.cart-qty {
  border-radius: 0;
  border: 1px solid #82de3a;
  background-color: rgba(130, 222, 58, 0.2);
  color: #82de3a;
  font-family: AirbnbMedium;
  font-weight: bold;
}
.cart-qty:hover {
  background-color: rgba(115, 255, 8, 0.2);
  border: 1px solid #82de3a;
  color: #82de3a;
}
.styleName {
  font-family: AirMedium;
  line-height: 3px;
  font-size: 12pt;
  margin-bottom: 25px;
}
.styleQty {
  background-color: white;
  font-weight: italic;
  color: #82de3a;
  border-radius: 0;
  border-top: 1px solid #82de3a;
  border-bottom: 1px solid #82de3a;
  border-left: 0px;
  border-right: 0px;
}
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #7e98df;
  border-radius: 30px;
}
::-webkit-scrollbar-thumb:hover {
  background: #7e98df;
}
</style>
