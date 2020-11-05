<template>
  <div class="background">
    <div class="card">
      <b-container fluid>
        <b-row>
          <b-col sm="7">
            <img
              src="@/assets/images/icons/asu.png"
              alt="Logos"
              class="icons"
            />
          </b-col>
          <b-col sm="5">
            <h4 style="margin-top: 70px; color: ">Welcome :)</h4>
            <p class="mr-3">
              To connected with us please register with your personal
              information
              <b-icon
                icon="bell-fill"
                class="rounded"
                variant="primary"
              ></b-icon>
            </p>
            <b-form @submit.prevent="onSubmit">
              <input
                type="text"
                v-model="form.name"
                placeholder="Your name"
                class="mt-4"
              />
              <input
                type="email"
                v-model="form.email"
                placeholder="Email address"
                class="mt-3"
              />
              <input
                type="password"
                v-model="form.password"
                placeholder="Password"
                class="mb-4 mt-3"
              />
              <b-button variant="primary" class="mr-3 btnLogin" type="submit">
                Register Now
              </b-button>
              <b-button
                variant="primary"
                class="btnCreateAccount"
                @click="onLogin"
              >
                Login
              </b-button>
            </b-form>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Regist',
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  computed: {
    ...mapState(['name'])
  },
  methods: {
    ...mapActions(['register']),
    onSubmit() {
      this.register(this.form)
        .then((response) => {
          this.$swal({
            position: 'center',
            icon: 'success',
            title: response,
            showConfirmButton: true,
            timer: 2100
          })
          setTimeout(() => this.$router.push('/'), 500)
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
    },
    onLogin() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.background {
  background-color: #f0f0f0;
  display: flex;
  height: 100vh;
  background-image: url('../assets/images/icons/background.png');
  background-position: center;
  background-repeat: no-repeat;
}
.card {
  width: 900px;
  height: 500px;
  background-color: #f7f7f7;
  margin: auto;
  box-shadow: 0px 0px 8px 1px #888888;
  border: none;
}
body {
  font-family: Helvetica;
}
.btnCreateAccount {
  border-radius: 30px;
  background-color: #ffffff;
  color: #333333;
  border: none;
}
.btnLogin {
  border-radius: 30px;
  background-color: #618eff;
  border: none;
}
.icons {
  width: 550px;
  margin-top: -40px;
  margin-left: -20px;
}

input {
  display: block;
  width: 90%;
  font-size: 12pt;
  line-height: 28pt;
  font-family: 'Helvetica';
  margin-bottom: 15px;
  border: none;
  border-bottom: 5px solid #b5caff;
  background: #edf2ff;
  min-width: 250px;
  padding-left: 5px;
  outline: none;
  color: rgba(0, 0, 0, 1);
}

input:focus {
  border-bottom: 5px solid #4079ff;
}
</style>
