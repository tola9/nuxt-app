<template>
  <div class="container">
    <div class="d-flex flex-row justify-content-center">
      <div class="row col-md-12">
        <div class="col-md-8">
            <div class="card-header mt-5"><h2>Favorite</h2></div>
            <div v-if="favorites.length" class="card-body ">
              <div class="row">
                <div v-for="product of favorites" :key="product.id" class="col-md-6" >
                  <b-card
                    :title="product.title"
                    :img-src="product.image"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style="max-width: 20rem;"
                  >
                    <b-card-text>
                      {{ product.detail }}
                    </b-card-text>
                    <img v-if="!product.isFavorite" src="https://img.icons8.com/small/16/000000/like--v1.png"/>
                    <img @click="removeFavorite(product)" v-else src="https://img.icons8.com/tiny-color/16/000000/experimental-like-tiny-color.png"/>
                    <nuxt-link :to="`/product/${product.id}`">Detail</nuxt-link>
                  </b-card>
                </div>
              </div>
            </div>
          <div v-else class="card-body">
            <h5>Product Not Found!!</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    middleware: 'auth',
    created() {
      this.getFavorite();
    },
    methods: {
      async getFavorite() {
        await this.$store.dispatch('getFavorite');
      },
      async removeFavorite(payload) {
        await this.$store.dispatch('removeFavorite', payload);
      }
    },
    computed: {
      favorites() {
        return this.$store.getters.getFavorites;
      },
    }
  }
</script>

<style scoped>
  .card-header:first-child {
    text-align: center;
  }
  a {
    color: white;
    text-decoration: none;
    background-color: #019267;
    padding: 5px 10px;
    border-radius: 8px;
    float: right;
  }
  a:hover {
    opacity: 0.7;
  }
</style>
