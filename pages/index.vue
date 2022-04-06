<template>
  <div>
    <div class="container">
      <div class="d-flex flex-row justify-content-center">
        <div class="row col-md-12">
          <div class="col-md-8 mt-3">
            <div class="card">
              <div class="card-header">
                <h3 class="align-content-center">Table of users</h3>
              </div>
              <div class="card-body">
                <b-table striped hover :fields="fields" :items="$store.getters.getUsers"></b-table>
              </div>
            </div>
          </div>
          <div class="col-md-4 mt-3">
            <div class="card">
              <div class="card-header align-content-center">Lists of users</div>
              <div class="card-body">
                <div class="row">
                  <div class="col">
                    <b-card-text>Count: </b-card-text>
                  </div>
                  <div class="col">
                    <b-card-text>{{ $store.getters.countUsers }}</b-card-text>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <b-card-text>Under 25: </b-card-text>
                  </div>
                  <div class="col">
                    <b-card-text>{{ $store.getters.underAge }}</b-card-text>
                  </div>
                </div>
              </div>
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
    data () {
      return {
        fields: [
          {
            key: 'age',
            value: 'Age'
          },
          {
            key: 'name',
            value: 'Name'
          },
          {
            key: 'email',
            value: 'Email'
          }
        ]
      }
    }
  }
</script>

<style scoped>
  .card-header:first-child {
    text-align: center;
  }
</style>
