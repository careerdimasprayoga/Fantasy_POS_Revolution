<template>
  <b-container fluid>
    <b-row class="noOverflow">
      <b-col sm="12" style="z-index: 1">
        <HeaderNormal />
      </b-col>
      <b-col sm="1" style="padding: 0; z-index: 1">
        <SideMenu />
      </b-col>
      <b-col sm="11" style="padding: 0">
        <SettingProducts />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import HeaderNormal from '@/components/_base/Header_normal.vue'
import SideMenu from '@/components/_base/SideMenu.vue'
import SettingProducts from '@/components/_base/management/Products.vue'

export default {
  name: 'ManageProduct',
  components: {
    HeaderNormal,
    SideMenu,
    SettingProducts
  }
}
</script>

<style scoped>
.noOverflow {
  overflow-x: hidden;
}
</style>
