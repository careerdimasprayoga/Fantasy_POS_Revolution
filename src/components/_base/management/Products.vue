<template>
  <b-container fluid class="background">
    <b-row>
      <b-col sm="12" class="mb-5">
        <b-card header-tag="header" class="mt-4">
          <template #header>
            <b-button
              variant="primary"
              size="sm"
              v-b-modal.modal-1
              @click="clickAddProducts()"
            >
              <b-icon icon="plus" font-scale="1.5"></b-icon>
            </b-button>
            <b-button variant="secondary" size="sm" class="ml-2">
              <b-icon icon="arrow-repeat" font-scale="1.5"></b-icon>
            </b-button>
          </template>
          <b-table small :fields="fields" :items="dataProducts" responsive="sm">
            <template v-slot:cell(price)="data">
              Rp.
              {{
                data.item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
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
                size="sm"
                >Edit</b-button
              >
              <b-button
                size="sm"
                variant="danger"
                @click="deleteProducts(data.item.id)"
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
        </b-card>
      </b-col>
      <!-- ================ Modal ================ -->
      <b-modal id="modal-1" v-bind:title="modalTitle" hide-footer>
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
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import mixins from '../../../mixins/mixins'

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
        status: '',
        id_products: ''
      },
      selectOptionStatus: [
        { value: '1', text: 'Active' },
        { value: '0', text: 'Non Active' }
      ],
      getEditDataProductId: 0
    }
  },
  computed: {
    ...mapGetters([
      'dataProducts',
      'dataCategorys',
      'dataTotalProducts',
      'userLogin'
    ])
  },
  methods: {
    ...mapActions({
      actionGetProducts: 'getProductsManage',
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
      this.$confirm({
        message: `Are you sure?`,
        button: {
          no: 'No',
          yes: 'Yes'
        },
        callback: (confirm) => {
          if (confirm) {
            this.actionDeleteProducts(id)
              .then((response) => {
                this.$swal({
                  position: 'center',
                  icon: 'success',
                  title: response,
                  showConfirmButton: true,
                  timer: 2100
                })
                setTimeout(() => this.actionGetProducts(), 500)
              })
              .catch((error) => {
                this.$swal({
                  position: 'center',
                  icon: 'error',
                  title: error,
                  showConfirmButton: true,
                  timer: 2100
                })
              })
          }
        }
      })
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
        status: data.status,
        id_products: data.id
      }
      this.getEditDataProductId = data.id
    },
    handleFile(event) {
      this.form.image = event.target.files[0]
      if (this.form.image.size >= 2097152) {
        this.$swal({
          position: 'center',
          icon: 'error',
          title: 'Max Image is 2Mb',
          showConfirmButton: true,
          timer: 2100
        })
      }
    },
    async addProducts() {
      try {
        if (this.form.image.size >= 2097152) {
          this.$swal({
            position: 'center',
            icon: 'error',
            title: 'Max Image is 2Mb',
            showConfirmButton: true,
            timer: 2100
          })
        }
        const data = new FormData()
        data.append('name', this.form.name)
        data.append('id_category', this.form.id_category)
        data.append('price', this.form.price)
        data.append('status', this.form.status)
        data.append('image', this.form.image)
        await this.actionAddProducts(data).then((response) => {
          this.$swal({
            position: 'center',
            icon: 'success',
            title: response,
            showConfirmButton: true,
            timer: 2100
          })
          this.form = []
          this.actionTotalProducts()
          this.actionGetProducts()
        })
      } catch (error) {
        this.$swal({
          position: 'center',
          icon: 'error',
          title: error,
          showConfirmButton: true,
          timer: 2100
        })
      }
    },
    async editProducts() {
      try {
        if (this.form.image.size >= 2097152) {
          this.$swal({
            position: 'center',
            icon: 'error',
            title: 'Max Image is 2Mb',
            showConfirmButton: true,
            timer: 2100
          })
        }
        await this.mutationSendIdProducts(this.form.id_products)

        const data = new FormData()
        data.append('name', this.form.name)
        data.append('id_category', this.form.id_category)
        data.append('price', this.form.price)
        data.append('status', this.form.status)
        data.append('image', this.form.image)
        await this.actionEditProducts(data).then((response) => {
          this.$swal({
            position: 'center',
            icon: 'success',
            title: response,
            showConfirmButton: true,
            timer: 2100
          })
          this.form = []
          this.actionTotalProducts()
          this.actionGetProducts()
        })
      } catch (error) {
        this.$swal({
          position: 'center',
          icon: 'error',
          title: error,
          showConfirmButton: true,
          timer: 2100
        })
      }
    },
    resetForm() {
      this.alertError = false
      this.alertSuccess = false
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
@import '../../../assets/css/fonts.css';
.background {
  background-color: rgba(190, 195, 202, 0.3);
}
.styleCard {
  background-color: white;
  padding: 20px;
}
.heading {
  height: 40px;
  background-color: #a5a5a5;
}
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
