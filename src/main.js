import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './common/css/reset.css'
import './common/css/border.css'
import './common/css/icon.css'
import './common/css/index.less'



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
