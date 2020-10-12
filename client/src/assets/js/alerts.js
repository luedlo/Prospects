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
  background: '#FFF linear-gradient(0deg, #333 0%, #00AC68DD 100%)'
})

// Alert Warning
Vue.prototype.$alert_warning = Swal.mixin({
  customClass: {
    title: 'white-text',
    content: 'white-text',
    confirmButton: 'btn waves-effect waves-light bg-warning mr-1',
    cancelButton: 'btn waves-effect waves-light bg-submain'
  },
  icon: 'warning',
  buttonsStyling: false,
  background: '#FFF linear-gradient(0deg, #333 0%, #F6BD60DD 100%)'
})

// Alert Question
Vue.prototype.$alert_question = Swal.mixin({
  customClass: {
    title: 'white-text',
    content: 'white-text',
    confirmButton: 'btn waves-effect waves-light bg-main mr-1',
    cancelButton: 'btn waves-effect waves-light bg-submain'
  },
  icon: 'question',
  buttonsStyling: false,
  background: '#FFF linear-gradient(0deg, #333 0%, #141E30DD 100%)'
})

// Alert Error
Vue.prototype.$alert_error = Swal.mixin({
  customClass: {
    title: 'white-text',
    content: 'white-text',
    confirmButton: 'btn waves-effect waves-light bg-error mr-1',
    cancelButton: 'btn waves-effect waves-light bg-submain'
  },
  icon: 'error',
  buttonsStyling: false,
  background: '#FFF linear-gradient(0deg, #333 0%, #C33C54DD 100%)'
})
