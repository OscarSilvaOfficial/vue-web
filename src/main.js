import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import vuetify from './plugins/vuetify';
import router from './router/router'
import { store } from './store/store'


Vue.config.productionTip = false
Vue.use(Vuex)

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
