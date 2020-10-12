// Working with VeeValidate 2.2.9
import Vue from 'vue'
import es from 'vee-validate/dist/locale/es'
import VeeValidate, { Validator } from 'vee-validate'

Validator.localize({ es: es })
Vue.use(VeeValidate, {
  locale: 'es',
  events: ''
})
