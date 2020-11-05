<template>
  <div id="header">
    <b-row class="rowModify">
      <b-col sm="1" class="text-center textMenu">
        <p>Menu</p>
      </b-col>
      <b-col sm="8" class="columnStyle">
        <b-row class="rowStyle" style="box-shadow: 0 4px 5px -2px gray">
          <b-col sm="3">
            <img
              src="../../assets/images/icons/menu.png"
              class="headerIcon"
              @click="pushSortirVisible()"
            />
          </b-col>
          <b-col sm="6">
            <h2 class="text-center textHeader">Fantasy Pos</h2>
          </b-col>
          <b-col sm="3">
            <img
              src="../../assets/images/icons/find.png"
              class="headerIconSearch"
              @click="searchVisible()"
            />
          </b-col>
        </b-row>
      </b-col>
      <b-col
        sm="3"
        class="columnStyle"
        style="
          border-left: #cecece solid 2px;
          z-index: 1;
          box-shadow: 0 4px 5px -2px gray;
        "
      >
        <p class="text-center textMenu">
          Cart
          <span
            style="
              background-color: #57cad5;
              border-radius: 50px;
              display: inline-block;
              width: 35px;
              height: 35px;
              font-size: 25px;
              color: white;
            "
            >{{ this.getCart.length }}</span
          >
        </p>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import mixins from '../../mixins/mixins'

export default {
  name: 'Header',
  mixins: [mixins],
  data() {
    return {
      visibleSortir: this.dataSortirVisible
    }
  },
  methods: {
    ...mapActions(['logout']),
    ...mapMutations(['pushShowSearch']),
    searchVisible() {
      if(this.dataShowSearch === false) {
        this.pushShowSearch(true)
      } else {
        this.pushShowSearch(false)
      }
    }
  },
  computed: {
    ...mapGetters(['getCart','dataShowSearch'])
  }
}
</script>

<style scoped>
@import '../../assets/css/fonts.css';
#header {
  background-color: #ffffff;
  height: 70px;
}
.rowModify {
  height: 70px;
}
.textMenu {
  margin-top: 10px;
  font-family: AirBook;
  font-size: 23pt;
}
.textHeader {
  margin-top: 10px;
  font-family: AirBook;
  font-size: 23pt;
}
.headerIcon {
  width: 35px;
  height: 35px;
  margin-top: 15px;
  margin-left: 20px;
  margin-right: 20px;
}
.headerIcon:hover {
  cursor: pointer;
}
.headerIconSearch {
  width: 35px;
  height: 35px;
  margin-top: 15px;
  margin-right: 20px;
  float: right;
}
.headerIconSearch:hover {
  cursor: pointer;
}
.columnStyle {
  height: 70px;
  border-left: 1px solid #cecece;
}
.rowStyle {
  height: 70px;
}
</style>
