/**
 * Created by Wu Jian Ping on - 2017/09/06.
 */

import Vue from 'vue'
import App from './app'
import './styles/icomoon/style.scss'
import './directives'
import './components'
import router from './router'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
