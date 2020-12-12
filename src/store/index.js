import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Uid: '',
    token: '',
  },

  mutations: {
    set_Uid(state, Uid) {
      state.Uid = Uid
    },

    set_token(state, token) {
      state.token = token
    },

    del_all(state, Uid, token,) {
      state.token = ''
      window.localStorage.removeItem('Uid')
      window.localStorage.removeItem('token')
    }
  },

  actions: {
  },

  modules: {
  }
})
