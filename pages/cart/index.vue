<template>
  <div class="container">
    <div class="d-flex flex-row justify-content-center">
      <div class="row col-md-12">
        <div class="col-md-8 mt-5">
            <div class="card-body"v-for="cart in carts" :key="cart.id">
              <div class="row">
                <div class="col">
                  <b-card
                    :title="cart.title"
                    img-src="https://picsum.photos/600/300/?image=25"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style="max-width: 20rem;"
                    class="mb-2"
                  >
                    <b-card-text>
                      {{ cart.detail }}
                    </b-card-text>
                  </b-card>
                    <b-button class="btn btn-success col-sm-2" @click="decrease(cart)" :disabled="cart.qty == 1">-</b-button>
                    <b-badge variant="light" :style="{fontSize: '14px'}">{{ cart.qty }}</b-badge>
                    <b-button class="btn btn-success col-sm-2" @click="increase(cart)">+</b-button>
                </div>
              </div>
            </div>
          </div>
        <div class="col-md-4 mt-5">
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
    name: "index",
    created() {
      console.log('cart', this.$store.getters.getCarts);
    },
    methods: {
      increase(payload) {
        this.$store.dispatch('increase', payload);
      },
      decrease(payload) {
        this.$store.dispatch('decrease', payload);
      }
    },
    computed: {
      carts() {
        return this.$store.getters.getCarts;
      }
    }
  }
</script>

<style scoped>
  .col-sm-2 {
    flex: 0 0 16.666667%;
    max-width: 50px;
  }
</style>
