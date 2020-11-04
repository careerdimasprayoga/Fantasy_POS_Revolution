<template>
  <div id="sideMenu">
    <b-row class="text-center">
      <b-col xl="12">
        <router-link to="/main">
          <img
            src="../../assets/images/icons/whiteblack/fork.png"
            class="sideMenuIcon"
          />
          <!-- Main -->
        </router-link>
      </b-col>
      <b-col xl="12" v-if="this.isAdmin === 2">
        <router-link to="/history">
          <img
            src="../../assets/images/icons/whiteblack/clipboard.png"
            class="sideMenuIcon"
          />
          <!-- History -->
        </router-link>
      </b-col>
      <b-col xl="12" v-if="this.isAdmin === 2">
        <router-link to="/manage_product">
          <img
            src="../../assets/images/icons/whiteblack/fast-food.png"
            class="sideMenuIcon"
          />
          <!-- Product -->
        </router-link>
      </b-col>
      <b-col xl="12" v-if="this.isAdmin === 2">
        <router-link to="/manage_category">
          <img
            src="../../assets/images/icons/whiteblack/manage.png"
            class="sideMenuIcon"
          />
          <!-- Category -->
        </router-link>
      </b-col>
      <b-col xl="12" v-if="this.isAdmin === 2">
        <router-link to="/manage">
          <img
            src="../../assets/images/icons/whiteblack/network.png"
            class="sideMenuIcon"
          />
          <!-- User -->
        </router-link>
      </b-col>
      <b-col xl="12">
        <router-link to="/manage">
          <img
            src="../../assets/images/icons/whiteblack/girl.png"
            class="sideMenuIcon"
          />
          <!-- Profile -->
        </router-link>
      </b-col>
      <b-col xl="12">
        <img
          src="../../assets/images/icons/whiteblack/exit.png"
          class="sideMenuIcon cursorPointer"
          @click="functLogout"
        />
        <!-- Logout -->
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'SideMenu',
  computed: {
    ...mapGetters(['isAdmin'])
  },
  methods: {
    ...mapActions(['logout']),
    functLogout() {
      this.$confirm({
        message: `Are you sure for sign out ?`,
        button: {
          no: 'No',
          yes: 'Yes'
        },
        callback: (confirm) => {
          if (confirm) {
            this.logout()
              .then((response) => {
                this.$swal({
                  position: 'center',
                  icon: 'success',
                  title: 'Sign out success',
                  showConfirmButton: true,
                  timer: 2100
                })
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
    }
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
.cursorPointer {
  cursor: pointer;
}
</style>
