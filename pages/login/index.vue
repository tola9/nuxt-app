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
  export default {
    name: "index",
    data () {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      async login() {
        await this.$store.dispatch('login', {email: this.email, password: this.password})
      },
    }
  }
</script>

<style scoped>
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
