import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default () => new Vuex.Store({
  state: {
    id: 0,
    profile: Object(),
    products: [],
    cart: [],
    qty: 1,
    favorite: []
  },
  getters: {
    totalPrice: (state => {
      return state.cart.reduce((total, item) => {
        return total + item.price * item.qty;
      }, 0);
    }),
    getCarts: (state => state.cart),
    getProducts: (state => state.products),
    countCarts: (state => state.cart.length),
    countProducts: (state => state.products.length),
    getProfile: (state => state.profile),
    getFavorites: (state => state.favorite),
    countFavorite: (state => state.favorite.length)
  },
  mutations: {
    SET_USER: (state, payload) => {
      state.profile = payload;
    },
    REGISTER: (state, payload) => {
      localStorage.setItem('name', payload.name);
      localStorage.setItem('email', payload.email);
      localStorage.setItem('password', payload.password);
      Vue.toasted.success('User created successfully', {
        theme: "primary",
        duration: 3000,
        position: "top-right"
      });
    },
    SET_PROFILE: (state, payload) => {
      state.profile = payload;
    },
    ADD_TO_CART: (state, payload) => {
      if(state.cart.includes(payload)) {
        return Vue.toasted.info('Already Exist!', {
          theme: "toasted-primary",
          position: "top-right",
          duration: 3000
        })
      }
      state.cart.push(payload);
      return Vue.toasted.success('Added Successfully', {
        theme: "toasted-primary",
        position: "top-right",
        duration: 2000
      })
    },
    INCREASE: (state, payload) => {
      return state.cart.filter(item => {
        if(item.id == payload.id) {
          return item.qty++;
        }
        return ;
      })
    },
    DECREASE: (state, payload) => {
      return state.cart.filter(item => {
        if(item.id == payload.id) {
          return item.qty--;
        }
        return ;
      })
    },
    REMOVE_CART: (state, payload) => {
      let carts = state.cart;
      let index = carts.findIndex(item => {
        if(item.id == payload.id) {
          item.qty = 1;
          return item.id == payload.id;
        };
        return ;
      });
      carts.splice(index, 1);
      state.cart = carts;
      return state.cart;
    },
    SET_PRODUCT: (state, payload) => {
      state.products = payload;
    },
    SET_FAVORITE: () => {
      Vue.toasted.success('Added to favorite', {
        theme: "toasted-primary",
        position: "top-right",
        duration: 2000
      });
    },
    GET_FAVORITE: (state, payload) => {
      state.favorite = payload;
    }
  },
  actions: {
    async setProducts(context) {
      let res = await this.$axios.$get('products');
      context.commit('SET_PRODUCT', res);
    },
    async setUser(context) {
      let res = await this.$axios.$get('user');
      context.commit('SET_USER', res.data);
    },
    register: async (context, payload) => {
      let res = await context.state.$axios.post('register', {
        name: payload.name,
        email: payload.email,
        password: payload.password
      })
      console.log(res.data);
      context.commit('REGISTER', payload);
    },
    setProfile: (context, payload) => {
      context.commit('SET_PROFILE', payload);
    },
    addToCart: (context, payload) => {
      context.commit('ADD_TO_CART', payload);
    },
    increase: (context, payload) => {
      context.commit('INCREASE', payload);
    },
    decrease: (context, payload) => {
      context.commit('DECREASE', payload);
    },
    removeCart: (context, payload) => {
      context.commit('REMOVE_CART', payload);
    },
    async setFavorite(context, payload) {
      if(context.state.favorite.length) {
        let favoriteId = context.state.favorite.filter(item => {
          return item.id == payload.id;
        });
        if(favoriteId.length && favoriteId[0].id == payload.id) {
          return Vue.toasted.info('Already Exist', {
            theme: "toasted-primary",
            position: "top-right",
            duration: 2000
          })
        }
      }
      await this.$axios.$post('/favorite', payload);
      context.commit('SET_FAVORITE');
      await context.dispatch('getFavorite');
      await context.dispatch('updateProduct', payload);
    },
    async getFavorite(context) {
      let res = await this.$axios.$get('/favorite');
      context.commit('GET_FAVORITE', res);
    },
    async updateProduct(context, payload) {
      await this.$axios.$put(`/products/${payload.id}`, payload);
    }
  }
})
