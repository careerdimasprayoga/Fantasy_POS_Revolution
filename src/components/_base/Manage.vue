<template>
  <b-container class="mt-4" style="padding: 0;">
    <div>
      <b-card no-body>
        <b-tabs pills card vertical end>
          <b-tab title="Product" active>
            <div class="searchStyle">
              <b-button type="button" class="mt-2" variant="success"
                >+ Add Product</b-button
              >
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
                  <b-dropdown-item-button @click="sort_category()" active
                    >Category</b-dropdown-item-button
                  >
                  <b-dropdown-divider></b-dropdown-divider>
                  <b-dropdown-group id="dropdown-group-1" header="Name">
                    <b-dropdown-item-button @click="sort_asc()"
                      >A-Z</b-dropdown-item-button
                    >
                    <b-dropdown-item-button @click="sort_desc()"
                      >Z-A</b-dropdown-item-button
                    >
                  </b-dropdown-group>
                  <b-dropdown-divider></b-dropdown-divider>
                  <b-dropdown-group id="dropdown-group-2" header="Date">
                    <b-dropdown-item-button @click="sort_date_asc()"
                      >Oldest</b-dropdown-item-button
                    >
                    <b-dropdown-item-button @click="sort_date_desc()"
                      >Newest</b-dropdown-item-button
                    >
                  </b-dropdown-group>
                  <b-dropdown-divider></b-dropdown-divider>
                  <b-dropdown-group id="dropdown-group-3" header="Price">
                    <b-dropdown-item-button @click="sort_price_asc()"
                      >Lowest</b-dropdown-item-button
                    >
                    <b-dropdown-item-button @click="sort_price_desc()"
                      >Highest</b-dropdown-item-button
                    >
                  </b-dropdown-group>
                </b-dropdown>
                <b-button type="submit" variant="primary">Find</b-button>
              </b-form>
            </div>
            <b-table striped hover :items="products"></b-table>
          </b-tab>
          <b-tab title="Category"><b-card-text>Category</b-card-text></b-tab>
          <b-tab title="User"><b-card-text>User</b-card-text></b-tab>
        </b-tabs>
      </b-card>
    </div>
  </b-container>
</template>

<script>
export default {
  name: 'Manage',
  data() {
    return {
      textSort: 'sort',
      products: [
        { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
        { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
        { age: 38, first_name: 'Jami', last_name: 'Carney' }
      ]
    }
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
</style>
