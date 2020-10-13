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
      <b-col xl="12" v-if="this.isAdmin === 2">
        <router-link to="/manage">
          <img
            src="../../assets/images/icons/manage.png"
            class="sideMenuIcon"
          />
        </router-link>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SideMenu',
  computed: {
    ...mapGetters(['isAdmin'])
  }
}
</script>

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
