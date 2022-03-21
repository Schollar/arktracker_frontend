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
    // Pusing new character data the the user characters list
    add_user_character(state, payload) {
      state.user_characters.push(payload)
    },
    // Filter through user characters list and remove character from list based on Id
    remove_user_character(state, payload) {
      state.user_characters = state.user_characters.filter(
        (char) => char.charId !== payload
      );
    }
  },
  actions: {
  },
  modules: {
  }
})
