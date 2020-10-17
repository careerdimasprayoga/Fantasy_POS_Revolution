<template>
  <b-container class="mt-4" style="padding: 0">
    <div>
      <b-card no-body>
        <b-tabs pills card vertical end>
          <b-tab title="Product" active>
            <div class="searchStyle">
              <b-button
                type="button"
                @click="clickAddProducts()"
                class="mt-2"
                variant="success"
                v-b-modal.modal-1
                >+ Add Product</b-button
              >
            </div>
            <b-table
              small
              :fields="fields"
              :items="dataProducts"
              responsive="sm"
            >
              <template v-slot:cell(price)="data">
                Rp.
                {{
                  data.item.price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                }}
              </template>
              <template v-slot:cell(status)="data">
                <div v-if="data.item.status === 1">Available</div>
                <div v-if="data.item.status === 0">Not Available</div>
              </template>
              <template v-slot:cell(image)="data">
                <img
                  v-bind:src="urlApi + '/' + data.item.image"
                  class="imageStyle"
                />
              </template>
              <template v-slot:cell(id)="data">
                <b-button
                  @click="clickEditProducts(data.item)"
                  v-b-modal.modal-1
                  variant="success"
                  class="mr-2"
                  >Edit</b-button
                >
                <b-button variant="danger" @click="deleteProducts(data.item.id)"
                  >Delete</b-button
                >
              </template>
            </b-table>
            <b-pagination
              class="paginationStyle"
              :total-rows="dataTotalProducts"
              :per-page="6"
              v-model="currentPage"
              aria-controls="my-table"
              @change="changePage"
            ></b-pagination>
          </b-tab>
          <b-tab title="Category"><b-card-text>Category</b-card-text></b-tab>
          <b-tab title="User"><b-card-text>User</b-card-text></b-tab>
        </b-tabs>
      </b-card>
    </div>
    <!-- ================ Modal ================ -->
    <b-modal id="modal-1" v-bind:title="modalTitle" hide-footer>
      <b-alert
        :show="alertSuccess"
        variant="success"
        class="small form-text text-muted"
        >{{ alertSuccessMessage }}</b-alert
      >
      <b-alert
        :show="alertError"
        variant="danger"
        class="small form-text text-muted"
        >{{ alertErrorMessage }}</b-alert
      >
      <b-form v-on:submit.prevent="addProduct">
        <b-form-group label="Product Name">
          <b-form-input
            v-model="form.name"
            type="text"
            required
            placeholder="Product Name"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Image">
          <b-form-file required @change="handleFile"></b-form-file>
        </b-form-group>
        <b-form-group label="Category">
          <b-form-select v-model="form.id_category">
            <b-form-select-option
              v-for="(item, index) in dataCategorys"
              :key="index"
              :value="`${item.category_id}`"
              >{{ item.category_name }}</b-form-select-option
            >
          </b-form-select>
        </b-form-group>
        <b-form-group label="Price">
          <b-form-input
            v-model="form.price"
            type="number"
            required
            placeholder="Price"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Status">
          <b-form-select
            v-model="form.status"
            :options="selectOptionStatus"
          ></b-form-select>
        </b-form-group>
      </b-form>
      <b-button @click="resetForm()" class="float-right" variant="danger"
        >Cancel</b-button
      >
      <b-button
        @click="addProducts()"
        v-if="conditionEdit === false"
        class="mr-3 float-right"
        variant="success"
        >Save</b-button
      >
      <b-button
        @click="editProducts()"
        v-else
        class="mr-3 float-right"
        variant="success"
        >Edit</b-button
      >
    </b-modal>
  </b-container>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import mixins from '../../mixins/mixins'

export default {
  name: 'Manage',
  mixins: [mixins],
  data() {
    return {
      conditionEdit: false,
      fields: [
        { key: 'image', label: 'Image' },
        { key: 'name', label: 'Product Name' },
        { key: 'category_name', label: 'Category' },
        { key: 'price', label: 'Price' },
        { key: 'status', label: 'Status' },
        { key: 'id', label: 'Actions' }
      ],
      form: {
        name: '',
        image: {},
        id_category: '',
        price: '',
        status: ''
      },
      selectOptionStatus: [
        { value: '1', text: 'Active' },
        { value: '0', text: 'Non Active' }
      ],
      getEditDataProductId: 0
    }
  },
  computed: {
    ...mapGetters(['dataProducts', 'dataCategorys', 'dataTotalProducts'])
  },
  methods: {
    ...mapActions({
      actionGetProducts: 'getProducts',
      actionGetCategorys: 'getCategorys',
      actionDeleteProducts: 'deleteProducts',
      actionAddProducts: 'addProducts',
      actionEditProducts: 'editProducts',
      actionTotalProducts: 'getTotalProducts'
    }),
    ...mapMutations({
      mutationChangePage: 'pushChangePage',
      mutationSendIdProducts: 'pushSendIdProducts'
    }),
    changePage(page) {
      if (parseInt(this.$route.query.page) !== page) {
        this.$router.push(`?page=${page}`)
      }
      this.mutationChangePage(page)
      this.actionGetProducts()
    },
    deleteProducts(id) {
      this.actionDeleteProducts(id)
        .then((response) => {})
        .catch((error) => {})
      this.actionGetProducts()
    },
    clickAddProducts() {
      this.modalTitle = 'Add Product'
      this.conditionEdit = false
      this.form = []
    },
    clickEditProducts(data) {
      this.modalTitle = 'Edit Product'
      this.conditionEdit = true
      this.alertSuccess = false
      this.alertError = false
      this.form = {
        name: data.name,
        image: data.image,
        id_category: data.category_id,
        price: data.price,
        status: data.status
      }
      this.getEditDataProductId = data.id
    },
    handleFile(event) {
      this.form.image = event.target.files[0]
      if (this.form.image.size >= 1000000) {
        this.alertErrorMessage = 'Max Filesize 1 mb'
        this.alertError = true
      } else {
        this.alertError = false
      }
    },
    addProducts() {
      const data = new FormData()
      data.append('name', this.form.name)
      data.append('id_category', this.form.id_category)
      data.append('price', this.form.price)
      data.append('status', this.form.status)
      data.append('image', this.form.image)
      this.actionAddProducts(data)
        .then((response) => {
          this.alertSuccessMessage = response
          this.alertSuccess = true
          this.alertError = false
          this.form = []
          this.actionTotalProducts()
          this.actionGetProducts()
        })
        .catch((error) => {
          this.alertErrorMessage = error
          this.alertError = true
          this.alertSuccess = false
        })
    },
    editProducts() {
      const data = new FormData()
      data.append('name', this.form.name)
      data.append('id_category', this.form.id_category)
      data.append('price', this.form.price)
      data.append('status', this.form.status)
      data.append('image', this.form.image)
      this.actionEditProducts(data)
        .then((response) => {
          this.alertSuccessMessage = response
          this.alertSuccess = true
          this.alertError = false
          this.form = []
          this.actionTotalProducts()
          this.actionGetProducts()
        })
        .catch((error) => {
          this.alertErrorMessage = error
          this.alertError = true
          this.alertSuccess = false
        })
    },
    resetForm() {
      this.form = []
    }
  },
  created() {
    this.actionGetProducts()
    this.actionGetCategorys()
    this.actionTotalProducts()
  }
}
</script>

<style scoped>
table {
  border: 1px solid #cecece;
}
.searchStyle {
  height: 70px;
}
.paginationStyle {
  margin-left: 40%;
  margin-top: 30px;
  margin-bottom: 30px;
}
.imageStyle {
  width: 60px;
  height: 60px;
  border-radius: 5px;
  object-fit: cover;
}
</style>
