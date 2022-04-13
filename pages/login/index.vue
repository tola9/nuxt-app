<template>
  <div class="container">
    <div class="d-flex flex-row justify-content-center">
      <div class="col-md-8 mt-3">
        <div class="card">
          <div class="card-header">Add New User</div>
          <div class="card-body">
            <b-form @submit.prevent="login">
              <b-container fluid>
                <b-row class="my-1">
                  <b-col sm="3">
                    <label for="email">Email</label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-input id="email" v-model="email" type="email" required />
                  </b-col>
                </b-row>
                <b-row class="my-1">
                  <b-col sm="3">
                    <label for="password">Password</label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-input id="password" v-model="password" type="password" required />
                  </b-col>
                </b-row>
                <div class="btnSubmit">
                  <button type="submit" class="btn btn-success col-sm-3">Login</button>
                </div>
              </b-container>
            </b-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from "vue";

  export default {
    name: "index",
    data () {
      return {
        email: '',
        password: ''
      }
    },
    created() {
      if(this.$auth.loggedIn) {
        this.$router.push('/');
      }
    },
    methods: {
      async login() {
        try {
          let data = await this.$axios.$get('/login');
          console.log(data);
          let res = await this.$auth.loginWith('local', {data: {email: this.email, password: this.password}});
          let user = res.config.data;
          this.$auth.setUser(user);
          return Vue.toasted.success("Logged In 🔓!!", {
            theme: "toasted-primary",
            position: "top-right",
            duration : 3000
          });

        } catch (err) {
          console.log(err)
        }
      }
    }
  }
</script>

<style scoped>
  .card {
    margin-top: 50px;
  }
  .btnSubmit {
    text-align: center;
    padding-top: 10px;
  }
  .btn-success {
    background-color: #28a745 !important;
  }
  .card-header:first-child {
    text-align: center;
    background-color: #28a745 !important;
    color: white;
  }
</style>
