import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import project from './modules/project'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    project,
    user
  },
  getters
})

export default store
