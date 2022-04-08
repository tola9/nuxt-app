<template>
  <div>
    <div class="user container">
      <div class="d-flex flex-row justify-content-center">
        <div class="col-md-8 mt-3">
          <div class="card">
            <div class="card-header">Add New User</div>
            <div class="card-body">
              <b-form @submit.prevent="addUser">
                <b-container fluid>
                  <b-row class="my-1">
                    <b-col sm="3">
                      <label for="name">Name</label>
                    </b-col>
                    <b-col sm="9">
                      <b-form-input v-model="name" id="name" type="text" />
                    </b-col>
                  </b-row>
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
                      <label for="age">Age</label>
                    </b-col>
                    <b-col sm="9">
                      <b-form-input id="age" v-model="age" type="text" required />
                    </b-col>
                  </b-row>
                  <div class="btnSubmit">
                    <button type="submit" class="btn btn-success col-sm-3">Add</button>
                  </div>
                </b-container>
              </b-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'IndexPage',
    middleware: 'auth',
    auth: true,
    data () {
      return {
        age: '',
        name: '',
        email: '',
        text: ''
      }
    },
    methods: {
      addUser () {
        this.$store.dispatch('addUser', { email: this.email, name: this.name, age: this.age });
        this.email = '';
        this.name = '';
        this.age = '';
      }
    }
  }
</script>

<style scoped>
  .card {
    margin-top: 50px;
  }
  .user {
    height: 300px;
  }
  .btnSubmit {
    text-align: center;
    padding-top: 10px;
  }
  .btn-success {
    background-color: #17a2b8 !important;
  }
  .card-header:first-child {
    text-align: center;
    background-color: #17a2b8 !important;
    color: white;
  }
</style>
