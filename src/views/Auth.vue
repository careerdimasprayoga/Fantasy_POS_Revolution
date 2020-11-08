<template>
  <div class="background">
    <div class="card">
      <b-container fluid>
        <b-row>
          <b-col xl="7" md="6">
            <img
              src="@/assets/images/icons/asu.png"
              alt="Logos"
              class="icons"
            />
          </b-col>
          <b-col xl="5" md="6">
            <h4 class="header">Welcome Back :)</h4>
            <p class="mr-3">
              To keep connected with us please login with your personal
              information by email and password
              <b-icon
                icon="bell-fill"
                class="rounded"
                variant="primary"
              ></b-icon>
            </p>
            <b-form @submit.prevent="onSubmit">
              <input
                type="email"
                v-model="form.email"
                placeholder="Email address"
                class="mt-4"
              />
              <input
                type="password"
                v-model="form.password"
                placeholder="Password"
                class="mb-4"
              />
              <b-button variant="primary" class="mr-3 btnLogin" type="submit">
                Login Now
              </b-button>
              <b-button
                variant="primary"
                class="btnCreateAccount"
                @click="onRegister"
              >
                Create Account
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
  name: 'Login',
  data() {
    return {
      form: {
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
    ...mapActions(['login']),
    onSubmit() {
      this.login(this.form)
        .then((response) => {
          this.$swal({
            position: 'center',
            icon: 'success',
            title: response,
            showConfirmButton: true,
            timer: 2100
          })
          setTimeout(() => this.$router.push('/main'), 500)
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
    onRegister() {
      this.$router.push('/regist')
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
.header {
  margin-top: 70px;
}

@media (max-width: 1200px) {
  .icons {
    width: 450px;
    margin-top: -5px;
    margin-right: -10px;
  }
}
@media (max-width: 768px) {
  .icons {
    width: 0px;
  }
  .card {
    width: 600px;
    height: 400px;
  }
  .mr-3 {
    margin-left: 30px;
  }
  .header {
    margin-top: 20px;
    margin-left: 30px;
  }
  form {
    text-align: center;
  }
  input {
    margin: auto;
    margin-bottom: 15px;
  }
}
@media (max-width: 576px) {
  .card {
    width: 400px;
  }
}
</style>
