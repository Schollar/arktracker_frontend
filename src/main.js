import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import cookies from 'vue-cookies'

Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.prototype.$cookies = cookies

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
