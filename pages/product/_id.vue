<template>
  <div>
    <div class="container">
      <div class="d-flex flex-row justify-content-center">
        <div class="col-md-12">
            <div class="card mt-3">
              <div class="card-header">{{ product.title }}</div>
              <div class="card-body">
                  <div class="row">
                    <div class="col-md-6">
                      <img src="https://picsum.photos/600/300/?image=25" width="400px"/>
                    </div>
                    <div class="col-md-6">
                      <b-card-text><b>{{ product.title }}</b></b-card-text>
                      <b-card-text>{{ product.detail }}</b-card-text>
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
    name: "productId",
    data () {
      return {
        product: null
      }
    },
    created() {
      this.product = this.products();
    },
    methods: {
      products() {
        let product =  this.$store.getters.getProducts.filter(product => {
          return product.id == this.$route.params.id;
        });
        return product[0];
      }
    }
  }
</script>

<style scoped>
  .card-header:first-child {
    border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;
    text-align: center;
  }
  img {
    padding-top: 8px;
  }
</style>
