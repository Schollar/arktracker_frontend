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
    },
    update_user_characters(state, payload) {
      state.user_characters = payload
    },
    add_user_character(state, payload) {
      state.user_characters.append(payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
