<template>
  <div>
    <div class="container">
      <div class="d-flex flex-row justify-content-center">
        <div class="row col-md-12">
          <div class="col-md-8">
            <div class="card-header mt-5"><h2>All Products</h2></div>
              <div class="card-body">
                <div class="row">
                  <div v-for="product of products" :key="product.id" class="col-md-6" >
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
                      <img @click="setFavorite(product)" v-if="!product.isFavorite" src="https://img.icons8.com/small/16/000000/like--v1.png"/>
                      <img @click="removeFavorite(product)" v-else src="https://img.icons8.com/tiny-color/16/000000/experimental-like-tiny-color.png"/>
                      <nuxt-link :to="`/product/${product.id}`">Detail</nuxt-link>
                    </b-card>
                  </div>
                </div>
              </div>
          </div>
          <div class="col-md-4 mt-4">
            <div class="card">
              <div class="card-header align-content-center">Lists of users</div>
              <div class="card-body">
                <div class="row">
                  <div class="col">
                    <b-card-text>Products: </b-card-text>
                  </div>
                  <div class="col">
                    <b-card-text>{{ $store.getters.countProducts }}</b-card-text>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <b-card-text>Favorites: </b-card-text>
                  </div>
                  <div class="col">
                    <b-card-text>{{ $store.getters.countFavorite }}</b-card-text>
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
        ],
        isFavorite: false,
      }
    },
    created() {
      this.setUser();
      this.test();
      this.getFavorite();
    },
    methods: {
      async setUser() {
        await this.$store.dispatch('setUser');
      },
      async test() {
        await this.$store.dispatch('setProducts');
      },
      setFavorite(favorite) {
        favorite.isFavorite = true;
        this.$store.dispatch('setFavorite', favorite);
      },
      getFavorite() {
        this.$store.dispatch('getFavorite');
      },
      async removeFavorite(payload) {
        await this.$store.dispatch('removeFavorite', payload);
      },
    },
    computed: {
      products() {
        return this.$store.getters.getProducts;
      }
    },
    mounted() {
      console.log(process.env.API_URL)
    }
  }
</script>

<style scoped>
  .card {
    margin-top: 20px;
  }
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
  .card-body {
    flex: 1 1 auto;
    min-height: 1px;
    padding: 0rem 1.25rem 0.5rem;
  }
</style>
