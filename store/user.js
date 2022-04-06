// import Vue from 'vue'
// export const state = () => ({
//   user: [],
// });
//
// export const getters = {
//   getUsers: state => state.user,
//   countUsers: state => state.user.length,
//   underAge: state => {
//     let total = 0;
//     state.user.filter(item => {
//       if ( item.age < 25 ) {
//         return total += 1;
//       }
//     });
//     return total;
//   }
// };
// //
// export const mutations = {
//   ADD_USER: (state, payload) => {
//     state.user.push(payload);
//     Vue.toasted.success("Created Successfully !!", {
//       theme: "toasted-primary",
//       position: "top-right",
//       duration : 3000
//     });
//
//   }
// };
//
// export const actions = {
//   addUser: (context, payload) => {
//     context.commit('ADD_USER', payload)
//   }
// };
