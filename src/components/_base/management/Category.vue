<template>
  <b-container fluid class="background">
    <b-row>
      <b-col sm="12" class="mb-5">
        <b-card header-tag="header" class="mt-4">
          <template #header>
            <b-button
              variant="info"
              size="sm"
              v-b-modal.modal-1
              @click="clickAddCategory()"
            >
              <b-icon icon="plus" font-scale="1.5"></b-icon>
            </b-button>
            <b-button
              variant="primary"
              size="sm"
              class="ml-2"
              @click="refresh()"
            >
              <b-icon icon="arrow-repeat" font-scale="1.5"></b-icon>
            </b-button>
          </template>
          <b-table
            small
            :fields="fields"
            :items="dataCategorys"
            responsive="sm"
          >
            <template v-slot:cell(name)="data">
              {{ data.item.category_name }}
            </template>
            <template v-slot:cell(category_id)="data">
              <b-button
                @click="clickEditCategory(data.item)"
                v-b-modal.modal-1
                variant="success"
                class="mr-2"
                size="sm"
                >Edit</b-button
              >
              <b-button
                size="sm"
                variant="danger"
                @click="deleteCategory(data.item.category_id)"
                >Delete</b-button
              >
            </template>
          </b-table>
        </b-card>
      </b-col>
      <!-- ================ Modal ================ -->
      <b-modal id="modal-1" v-bind:title="modalTitle" hide-footer>
        <b-form v-on:submit.prevent="addCategory">
          <b-form-group label="Category Name">
            <b-form-input
              v-model="form.name"
              type="text"
              required
              placeholder="Category Name"
            ></b-form-input>
          </b-form-group>
        </b-form>
        <b-button @click="resetForm()" class="float-right" variant="danger"
          >Cancel</b-button
        >
        <b-button
          @click="addCategory()"
          v-if="conditionEdit === false"
          class="mr-3 float-right"
          variant="success"
          >Save</b-button
        >
        <b-button
          @click="editCategory()"
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
  name: 'ManageCategory',
  mixins: [mixins],
  data() {
    return {
      conditionEdit: false,
      fields: [
        { key: 'category_name', label: 'Category' },
        { key: 'category_id', label: 'Category' }
      ],
      form: {
        name: '',
        id: ''
      },
      getEditDataCategoryId: 0
    }
  },
  computed: {
    ...mapGetters(['dataCategorys', 'userLogin'])
  },
  methods: {
    ...mapActions({
      actionGetCategorys: 'getCategorys',
      actionDeleteCategorys: 'deleteCategorys',
      actionAddCategorys: 'addCategorys',
      actionEditCategorys: 'editCategorys'
    }),
    ...mapMutations({
      mutationSendIdCategorys: 'pushSendIdCategorys'
    }),
    deleteCategory(id) {
      this.$confirm({
        message: `Are you sure?`,
        button: {
          no: 'No',
          yes: 'Yes'
        },
        callback: (confirm) => {
          if (confirm) {
            this.actionDeleteCategorys(id)
              .then((response) => {
                this.$swal({
                  position: 'center',
                  icon: 'success',
                  title: response,
                  showConfirmButton: true,
                  timer: 2100
                })
                setTimeout(() => this.actionGetCategorys(), 500)
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
    clickAddCategory() {
      this.modalTitle = 'Add Category'
      this.conditionEdit = false
      this.form = []
    },
    clickEditCategory(data) {
      this.modalTitle = 'Edit Category'
      this.conditionEdit = true
      this.form = {
        id: data.category_id,
        name: data.category_name
      }
      this.getEditDataCategoryId = data.category_id
    },
    async addCategory() {
      try {
        let dummyData = { ...this.form }
        await this.actionAddCategorys(dummyData).then((response) => {
          this.$swal({
            position: 'center',
            icon: 'success',
            title: response,
            showConfirmButton: false,
            timer: 2100
          })
          this.form = []
          this.actionGetCategorys()
        })
      } catch (error) {
        this.$swal({
          position: 'center',
          icon: 'error',
          title: error,
          showConfirmButton: false,
          timer: 2100
        })
      }
    },
    async editCategory() {
      try {
        await this.mutationSendIdCategorys(this.getEditDataCategoryId)
        console.log(this.getEditDataCategoryId)

        await this.actionEditCategorys(this.form).then((response) => {
          this.$swal({
            position: 'center',
            icon: 'success',
            title: response,
            showConfirmButton: true,
            timer: 2100
          })
          this.form = []
          this.actionGetCategorys()
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
      this.form = []
    },
    refresh() {
      this.actionGetCategorys()
    }
  },
  created() {
    this.actionGetCategorys()
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
</style>
