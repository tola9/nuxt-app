<template>
    <div class="container">
      <div class="d-flex flex-row justify-content-center">
        <div class="row col-md-12">
            <div class="col-md-8 mt-3">
              <div class="card">
                <div class="card-header"><h2>{{ product.title }}</h2></div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-4">
                      <b-img thumbnail fluid :src="product.image" alt="Image 1"></b-img>
                      <b-card-text class="mt-3 align-content-center"><b>Price</b> $ {{ product.price}}</b-card-text>
                      <b-button class="btn btn-success col-sm-2" @click="addToCart(product)">Buy Now</b-button>
                    </div>
                    <div class="col-md-8">
                      <b-card-text><b>{{ product.title }}</b></b-card-text>
                      <b-card-text>{{ product.detail }}</b-card-text>
                    </div>
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
                        <b-card-text>Cart : </b-card-text>
                      </div>
                      <div class="col">
                        <b-card-text>{{ $store.getters.countCarts }}</b-card-text>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <b-card-text>Discount : </b-card-text>
                      </div>
                      <div class="col">
                        <b-card-text>{{ $store.getters.underAge }}</b-card-text>
                      </div>
                    </div>
                  </div>
                <div class="card-footer">
                  <div class="row">
                    <div class="col">
                      <b-card-text>Total Price : </b-card-text>
                    </div>
                    <div class="col">
                      <b-card-text>$ {{ $store.getters.totalPrice }}</b-card-text>
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
    middleware: 'auth',
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
      },
      addToCart(payload) {
        this.$store.dispatch('addToCart', payload);
      }
    }
  }
</script>

<style scoped>
  .card-text:last-child {
    text-align: center;
  }
    .col-sm-2 {
      max-width: 200px;
    }
  .card {
    margin-top: 50px;
  }
  .card-header:first-child {
    border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;
    text-align: center;
  }
  img {
    padding-top: 8px;
  }
  .btn-success {
    color: #fff;
    background-color: #019267;
    border-color: #019267;
  }
</style>
