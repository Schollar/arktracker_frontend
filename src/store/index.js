import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    user_characters: []
  },
  mutations: {
    update_user(state, payload) {
      state.user = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
