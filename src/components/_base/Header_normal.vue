<template>
  <div id="header">
    <b-row class="rowModify">
      <b-col sm="1" class="text-center textMenu">
        <p>Menu</p>
      </b-col>
      <b-col sm="11" class="columnStyle">
        <b-row class="rowStyle" style="box-shadow: 0 4px 5px -2px gray">
          <b-col sm="3">
            <img src="../../assets/images/icons/menu.png" class="headerIcon" />
          </b-col>
          <b-col sm="6">
            <h2 class="text-center textHeader">Fantasy Pos</h2>
          </b-col>
          <b-col sm="3"> </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'HeaderNormal',
  methods: {
    ...mapActions(['logout'])
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
.columnStyle {
  height: 70px;
  border-left: 1px solid #cecece;
}
.rowStyle {
  height: 70px;
}
</style>
