import Vue from 'vue'
import Swal from 'sweetalert2'

// Alert Success
Vue.prototype.$alert_success = Swal.mixin({
  customClass: {
    title: 'white-text',
    content: 'white-text',
    confirmButton: 'btn waves-effect waves-light bg-secondary mr-1',
    cancelButton: 'btn waves-effect waves-light bg-submain'
  },
  icon: 'success',
  buttonsStyling: false,
  background: '#8BC6EC linear-gradient(0deg, #2C3E50 0%, #4CA1AF 100%)'
})

// Alert Warning
Vue.prototype.$alert_warning = Swal.mixin({
  customClass: {
    title: 'white-text',
    content: 'white-text',
    confirmButton: 'btn waves-effect waves-light bg-secondary mr-1',
    cancelButton: 'btn waves-effect waves-light bg-submain'
  },
  icon: 'warning',
  buttonsStyling: false,
  background: '#8BC6EC linear-gradient(0deg, #4b79a1 0%, #283e51 100%)'
})

// Alert Question
Vue.prototype.$alert_question = Swal.mixin({
  customClass: {
    title: 'white-text',
    content: 'white-text',
    confirmButton: 'btn waves-effect waves-light bg-secondary mr-1',
    cancelButton: 'btn waves-effect waves-light bg-submain'
  },
  icon: 'question',
  buttonsStyling: false,
  background: '#8BC6EC linear-gradient(0deg, #2980b9 0%, #2c3e50 100%)'
})

// Alert Error
Vue.prototype.$alert_error = Swal.mixin({
  customClass: {
    title: 'white-text',
    content: 'white-text',
    confirmButton: 'btn waves-effect waves-light bg-secondary mr-1',
    cancelButton: 'btn waves-effect waves-light bg-submain'
  },
  icon: 'error',
  buttonsStyling: false,
  background: '#8BC6EC linear-gradient(0deg, #141E30 0%, #243B55 100%)'
})
