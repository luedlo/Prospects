// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'materialize-css/dist/css/materialize.min.css'

// Require CSS Styles
require('@/assets/css/utilities.css')
require('@/assets/css/general.css')
require('@/assets/css/materialize.css')

// Require JS Scripts
require('@/assets/js/alerts')
require('@/assets/js/validations')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
