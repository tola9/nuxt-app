import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default () => new Vuex.Store({
  state: {
    user: [],
    profile: Object()
  },
  getters: {
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
    LOGIN: (state, payload) => {
      let email = localStorage.getItem('email');
      let password = localStorage.getItem('password');
      if(email != payload.email || password != payload.password) {
        Vue.toasted.error('Invalid Credential', {
          theme: "primary",
          position: "top-right",
          duration: 3000
        });
        return;
      }
      $nuxt._router.push('/')
    },
    SET_PROFILE: (state, payload) => {
      state.profile = payload;
    },
    LOGOUT: () => {
      localStorage.removeItem('email');
      localStorage.removeItem('password');
      localStorage.removeItem('name');
      $nuxt._router.push('login');
    }
  },
  actions: {
    addUser: (context, payload) => {
      context.commit('ADD_USER', payload)
    },
    login: async (context, payload) => {
      try {
        context.commit('LOGIN', payload);
        payload.name = localStorage.getItem('name');
        await context.dispatch('setProfile', payload);
      } catch (e) {
        Vue.toasted.error('Invalid Credential', {
          theme: 'toasted-primary',
          position: 'top-right',
          duration: 3000
        });
        console.log(e.message);
      }
    },
    register: (context, payload) => {
      console.log(payload);
      context.commit('REGISTER', payload);
    },
    setProfile: (context, payload) => {
      context.commit('SET_PROFILE', payload);
    },
    logout: (context) => {
      context.commit('LOGOUT');
    }
  }
})
