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
        detail: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
        image: ''
      },
      {
        id: 2,
        title: 'Title Two',
        detail: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
        image: ''
      }
    ],
    product: null,
  },
  getters: {
    // getProduct: (state => state.product),
    getProducts: (state => state.products),
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
  }
})
