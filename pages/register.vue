<template>
  <div class="container">
    <div class="d-flex flex-row justify-content-center">
      <div class="col-md-8 mt-3">
        <div class="card">
          <div class="card-header">Add New User</div>
          <div class="card-body">
            <b-form @submit.prevent="signUp">
              <b-container fluid>
                <b-row class="my-1">
                  <b-col sm="3">
                    <label for="name">Name</label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-input id="name" v-model="register.name" type="text" required />
                  </b-col>
                </b-row>
                <b-row class="my-1">
                  <b-col sm="3">
                    <label for="email">Email</label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-input id="email" v-model="register.email" type="email" required />
                  </b-col>
                </b-row>
                <b-row class="my-1">
                  <b-col sm="3">
                    <label for="password">Password</label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-input id="password" v-model="register.password"  type="password" required />
                  </b-col>
                </b-row>
                <div class="btnSubmit">
                  <button type="submit" class="btn btn-success col-sm-3">Sign Up</button>
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
    name: "register",
    data () {
      return {
        register: {
          name: '',
          email: '',
          password: ''
        }
      }
    },
    methods: {
      signUp() {
        this.$store.dispatch('register', {name: this.register.name, email: this.register.email, password: this.register.password});
        this.register.email = '';
        this.register.password = '';
      }
    }
  }
</script>

<style scoped>

</style>
