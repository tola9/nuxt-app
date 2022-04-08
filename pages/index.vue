<template>
  <div>
    <div class="container">
      <div class="d-flex flex-row justify-content-center">
        <div class="row col-md-12">
          <div class="col-md-8">
              <div class="card-body">
                <div class="row">
                  <div v-for="product of products" :key="product.id" class="col-md-6" >
                    <b-card
                      :title="product.title"
                      img-src="https://picsum.photos/600/300/?image=25"
                      img-alt="Image"
                      img-top
                      tag="article"
                      style="max-width: 20rem;"
                      class="mb-2"
                    >
                      <b-card-text>
                        {{ product.detail }}
                      </b-card-text>

                      <nuxt-link :to="`/product/${product.id}`">Detail</nuxt-link>
                    </b-card>
                  </div>
                </div>
              </div>
          </div>
          <div class="col-md-4 mt-3">
            <div class="card">
              <div class="card-header align-content-center">Lists of users</div>
              <div class="card-body">
                <div class="row">
                  <div class="col">
                    <b-card-text>Number of products: </b-card-text>
                  </div>
                  <div class="col">
                    <b-card-text>{{ $store.getters.countProducts }}</b-card-text>
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
    middleware: 'auth',
    data () {
      return {
        fields: [
          {
            key: 'id',
            value: 'Id'
          },
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
    },
    computed: {
      products() {
        return this.$store.getters.getProducts;
      }
    }
  }
</script>

<style scoped>
  .card {
    margin-top: 50px;
  }
  .card-header:first-child {
    text-align: center;
  }
  a {
    color: white;
    text-decoration: none;
    background-color: #007bff;
    padding: 5px 10px;
    border-radius: 8px;
    float: right;
  }
  a:hover {
    opacity: 0.7;
  }
</style>
