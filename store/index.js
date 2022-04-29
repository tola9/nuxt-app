import Vue from 'vue'
import Vuex from 'vuex'
import {colgroupMixin} from "bootstrap-vue/esm/components/table/helpers/mixin-colgroup";

Vue.use(Vuex)

export default () => new Vuex.Store({
  state: {
    id: 0,
    profile: Object(),
    products: [],
    cart: [],
    qty: 1,
    favorite: [],
    product: ''
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
    countFavorite: (state => state.favorite.length),
    getProduct: (state => state.product)
  },
  mutations: {
    SET_USER: (state, payload) => {
      state.profile = payload;
    },
    SET_PROFILE: (state, payload) => {
      state.profile = payload;
    },
    ADD_TO_CART: (state, payload) => {

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
    },
    REMOVE_FAVORITE: (state, payload) => {
      let favorites = state.favorite;
      let index = favorites.findIndex(item => {
        return item.id == payload.id;
      });
      favorites.splice(index, 1);
      state.favorite = favorites;
    },
    ADD_PRODUCT: (state, payload) => {
      console.log('payload', payload);
    },
    GET_CART: (state, payload) => {
      state.cart = payload;
    },
    PRODUCT: (state, payload) => {
      state.product = payload;
    }
  },
  actions: {
    async setProducts({commit}) {
      let res = await this.$axios.$get('products');
      commit('SET_PRODUCT', res);
    },
    async setUser({ commit }) {
      let res = await this.$axios.$get('user');
      commit('SET_USER', res.data);
    },
    setProfile: ({ commit}, payload) => {
      commit('SET_PROFILE', payload);
    },
    async addToCart ({ commit, state }, payload) {
      if(state.cart.length) {
        let cart = state.cart.filter(item => {
          return item.id == payload.id;
        })
        if(cart.length) {
          return Vue.toasted.info('Already Exist!', {
            theme: "toasted-primary",
            position: "top-right",
            duration: 3000
          })
        }
      }
      await this.$axios.$post('/carts', payload);
      commit('ADD_TO_CART', payload);
    },
    async getCart({ commit }) {
      let res = await this.$axios.$get('/carts');
      commit('GET_CART', res)
    },
    async increase ({ commit}, payload) {
      console.log('payload', payload.qty)
      await this.$axios.$put('/carts/' + payload.id, payload);
      commit('INCREASE', payload);
    },
    decrease: ({ commit}, payload) => {
      commit('DECREASE', payload);
    },
    async removeCart ({ commit }, payload) {
      commit('REMOVE_CART', payload);
      await this.$axios.$delete('/carts/' + payload.id);
      return Vue.toasted.success('Removed successfully', {
        theme: 'toasted-primary',
        position: "top-right",
        duration: 1000
      })
    },
    async setFavorite({ commit, dispatch }, payload) {
      await this.$axios.$post('/favorite', payload);
      commit('SET_FAVORITE');
      await dispatch('getFavorite');
      await dispatch('updateProduct', payload);
    },
    async getFavorite({ commit }) {
      let res = await this.$axios.$get('/favorite');
      commit('GET_FAVORITE', res);
    },
    async updateProduct({ commit }, payload) {
      await this.$axios.$put(`/products/${payload.id}`, payload);
    },
    async removeFavorite({commit, dispatch}, payload) {
      await this.$axios.$delete(`/favorite/${payload.id}`);
      commit('REMOVE_FAVORITE', payload);
      payload.isFavorite = false;
      await dispatch('updateProduct', payload);
    },
    async addProduct({ commit }, payload) {
      await this.$axios.post('/products', payload);
      Vue.toasted.success('Created successfully', {
        theme: "toasted-primary",
        position: "top-right",
        duration: 1000
      })
    },
    async product({ commit }, id) {
      let res = await this.$axios.$get('/products/' + id);
      commit('PRODUCT', res);
    }
  }
})
