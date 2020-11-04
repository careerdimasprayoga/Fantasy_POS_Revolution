<template>
  <div id="product">
    <b-row>
      <b-col sm="12">
        <div class="searchStyle">
          <b-form
            inline
            class="float-right formStyle"
            v-on:submit.prevent="searchProduct"
          >
            <b-input
              id="inline-form-input-name"
              class="mb-2 mr-sm-2 mb-sm-0"
              placeholder="Search Product"
              v-model="search"
            ></b-input>

            <b-dropdown
              id="sort"
              :text="textSort"
              class="m-2 sort-btn"
              variant="primary"
            >
              <b-dropdown-item-button @click="sort('category')" active
                >Category</b-dropdown-item-button
              >
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-group id="dropdown-group-1" header="Name">
                <b-dropdown-item-button @click="sort('nameASC')"
                  >A-Z</b-dropdown-item-button
                >
                <b-dropdown-item-button @click="sort('nameDESC')"
                  >Z-A</b-dropdown-item-button
                >
              </b-dropdown-group>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-group id="dropdown-group-2" header="Date">
                <b-dropdown-item-button @click="sort('oldest')"
                  >Oldest</b-dropdown-item-button
                >
                <b-dropdown-item-button @click="sort('newest')"
                  >Newest</b-dropdown-item-button
                >
              </b-dropdown-group>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-group id="dropdown-group-3" header="Price">
                <b-dropdown-item-button @click="sort('lowest')"
                  >Lowest</b-dropdown-item-button
                >
                <b-dropdown-item-button @click="sort('highest')"
                  >Highest</b-dropdown-item-button
                >
              </b-dropdown-group>
            </b-dropdown>
            <b-button type="submit" variant="primary">Find</b-button>
          </b-form>
        </div>
      </b-col>
      <b-col sm="12">
        <b-container class="styleContainer">
          <div class="productStyle">
            <b-row>
              <b-col
                xl="4"
                lg="6"
                md="12"
                v-for="(item, index) in dataProducts"
                :key="index"
              >
                <b-card
                  v-bind:img-src="urlApi + '/' + item.image"
                  img-alt="Image"
                  img-top
                  class="cardStyle"
                  @click="addToCart(item)"
                >
                  <b-card-text class="cardStyle-text-name font-book">{{
                    item.name
                  }}</b-card-text>
                  <b-card-text class="cardStyle-text-price font-medium"
                    >Rp.
                    {{
                      item.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                    }}</b-card-text
                  >
                </b-card>
              </b-col>
              <b-col sm="12">
                <b-pagination
                  class="justify-content-center"
                  style="margin-top: 25px; margin-bottom: 30px"
                  :total-rows="dataTotalProducts"
                  :per-page="6"
                  v-model="currentPage"
                  aria-controls="my-table"
                  @change="changePage"
                ></b-pagination>
              </b-col>
            </b-row>
          </div>
        </b-container>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import mixins from '../../mixins/mixins'

export default {
  name: 'Product',
  mixins: [mixins],
  data() {
    return {
      textSort: 'Sort',
      currentPage: 1,
      urlApi: process.env.VUE_APP_URL,
      search: ''
    }
  },
  computed: {
    ...mapGetters(['dataProducts', 'dataTotalProducts', 'getCart'])
  },
  methods: {
    ...mapActions({
      actionGetProducts: 'getProducts',
      actionSearchProducts: 'searchProducts',
      actionTotalProducts: 'getTotalProducts',
      actionSortProducts: 'sortProducts'
    }),
    ...mapMutations({
      mutationChangePage: 'pushChangePage',
      mutationAddCart: 'pushCarts'
    }),
    changePage(page) {
      if (parseInt(this.$route.query.page) !== page) {
        this.$router.push(`?page=${page}`)
      }
      this.mutationChangePage(page)
      this.actionGetProducts()
    },
    searchProduct() {
      if (this.search === '') {
        this.actionGetProducts()
      } else {
        this.actionSearchProducts(this.search)
      }
    },
    sort(data) {
      this.actionSortProducts(data)
    },
    addToCart(data) {
      let dataCart = {
        invoice: Math.floor(Math.random() * 1000000000 + 1),
        product_id: data.id,
        product_name: data.name,
        product_image: data.image,
        product_price: data.price,
        price: data.price,
        ppn: (data.price * 5) / 100,
        qty: 1
      }
      this.mutationAddCart(dataCart)
    }
  },
  created() {
    this.actionGetProducts()
    this.actionTotalProducts()
  }
}
</script>

<style scoped>
@import '../../assets/css/fonts.css';
#product {
  background-color: #dddddd;
  height: 700px;
}
.searchStyle {
  height: 85px;
  margin-top: -10px;
}
.formStyle {
  margin-top: 20px;
  margin-right: 30px;
}
.productStyle {
  height: 600px;
  overflow: auto;
  overflow-x: hidden;
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
.cardStyle {
  background-color: transparent;
  border: none;
  font-size: 16pt;
  margin-left: 5px;
}
.cardStyle:hover {
  cursor: pointer;
}
.cardStyle img {
  object-fit: cover;
  width: 255px !important;
  height: 200px !important;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.cardStyle-text-name {
  margin-left: -10px;
  margin-top: -15px;
}
.cardStyle-text-price {
  margin-left: -10px;
  margin-top: -20px;
}
.styleContainer {
  padding-top: 0;
  padding-bottom: 0;
}
@media (min-width: 992px) {
  .cardStyle img {
    width: 240px;
    height: 180px;
    object-fit: cover;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
}
.rowStyle {
  margin-left: 10px;
}
</style>
