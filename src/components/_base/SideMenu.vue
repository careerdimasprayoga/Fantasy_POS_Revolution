<template>
  <div id="sideMenu">
    <b-row class="text-center">
      <b-col xl="12">
        <router-link to="/">
          <img src="../../assets/images/icons/fork.png" class="sideMenuIcon" />
        </router-link>
      </b-col>
      <b-col xl="12">
        <router-link to="/">
          <img
            src="../../assets/images/icons/clipboard.png"
            class="sideMenuIcon"
          />
        </router-link>
      </b-col>
    </b-row>
  </div>
</template>

<style scoped>
#sideMenu {
  background-color: #ffffff;
  height: 700px;
  border-top: 1px solid #cecece;
}
.sideMenuIcon {
  width: 50px;
  height: 50px;
  margin-top: 25px;
}
</style>
