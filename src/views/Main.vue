<template>
  <b-container fluid>
    <b-row class="noOverflow">
      <b-col sm="12" style="z-index: 1">
        <Header />
      </b-col>
      <b-col sm="1" style="padding: 0; z-index: 1">
        <SideMenu />
      </b-col>
      <b-col sm="8" style="padding: 0">
        <Product />
      </b-col>
      <b-col sm="3" style="padding: 0">
        <Cart />
      </b-col>
      <b-col sm="12" style="background-color: #ffffff; height: 60px;">
        <p class="text-center font-book" style="margin-top: 15px">Built with <b-icon icon="heart-fill" variant="danger" font-scale="0.9"></b-icon> by Dimas Prayoga</p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Header from '@/components/_base/Header.vue'
import SideMenu from '@/components/_base/SideMenu.vue'
import Product from '@/components/_base/Product.vue'
import Cart from '@/components/_base/Cart.vue'

export default {
  name: 'Home2',
  components: {
    Header,
    SideMenu,
    Product,
    Cart
  }
}
</script>

<style scoped>
@import '../assets/css/fonts.css';
.noOverflow {
  overflow-x: hidden;
}
</style>
