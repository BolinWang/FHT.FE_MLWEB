// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import VueLazyload from 'vue-lazyload'
import VueCookies from 'vue-cookies'

import 'materialize-css/dist/js/materialize.min.js'
import './assets/sass/materialize.scss'
import './assets/sass/style.scss'

Vue.config.productionTip = false

Vue.use(VueLazyload, {
  loading: require('@/assets/lazyLoad@3x.png')
})
Vue.use(VueCookies)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  mounted () {
    // You'll need this for renderAfterDocumentEvent.
    document.dispatchEvent(new Event('render-event'))
  }
})
