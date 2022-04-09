import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default () => new Vuex.Store({
  state: {
    user: [],
    id: 0,
    profile: Object(),
    products: [
      {
        id: 1,
        title: 'Title One',
        detail: 'It is a long established fact that a reader will be distracted by the readable contentr  (injected humour and the like).',
        image: 'https://azcd.domayne.com.au/media/catalog/product/cache/25/small_image/400x225/9df78eab33525d08d6e5fb8d27136e95/1/7/17_159.jpg',
        price: 12,
        qty: 1,
      },
      {
        id: 2,
        title: 'Title Two',
        detail: 'It is a long established fact that a reader will be distracted by the readable content pose (injected humour and the like).',
        image: 'https://i.nextmedia.com.au/Utils/ImageResizer.ashx?n=https%3A%2F%2Fi.nextmedia.com.au%2FNews%2F20181003110807_surface-pro-6-1_web.jpg&w=480&c=0&s=1',
        price: 50,
        qty: 1,
      },
      {
        id: 3,
        title: 'Title Three',
        detail: 'It is a long established fact that a reader will be distracted by the readable contentr  (injected humour and the like).',
        image: 'https://little-beans.net/wp-content/uploads/2022/02/Surface-Laptop-Studio-eyecatch.jpg',
        price: 40,
        qty: 1,
      },
      {
        id: 4,
        title: 'Title Four',
        detail: 'It is a long established fact that a reader will be distracted by the readable content pose (injected humour and the like).',
        image: 'https://surface-world.de/wp-content/uploads/2021/09/microsoft-surface-laptop-studio-for-business-3.jpg',
        price: 25,
        qty: 1,
      }
    ],
    cart: [],
    qty: 1,
  },
  getters: {
    // getProduct: (state => state.product),
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
    getUsers: state => state.user,
    countUsers: state => state.user.length,
    underAge: state => {
      let total = 0;
      state.user.filter(item => {
        if ( item.age < 25 ) {
          return total += 1;
        }
      });
      return total;
    }
  },
  mutations: {
    ADD_USER: (state, payload) => {
      payload.id = ++state.id;
      state.user.push(payload);
      Vue.toasted.success("Created Successfully ✔🎉!!", {
        theme: "toasted-primary",
        position: "top-right",
        duration : 3000
      });

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
    }
  },
  actions: {
    addUser: (context, payload) => {
      context.commit('ADD_USER', payload)
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
    }
  }
})
