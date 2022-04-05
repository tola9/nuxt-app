import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default () => new Vuex.Store({
  state: {
    user: [],
  },
  getters: {
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

    }
  },
  actions: {
    addUser: (context, payload) => {
      context.commit('ADD_USER', payload)
    }
  }
})
