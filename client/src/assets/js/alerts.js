import Vue from 'vue'
import Swal from 'sweetalert2'

Vue.prototype.$alert_error = Swal.mixin({
  customClass: {
    confirmButton: 'btn bg-secondary mr-1',
    cancelButton: 'btn bg-submain'
  },
  buttonsStyling: false,
  background: '#8BC6EC linear-gradient(0deg, #141E30 0%, #243B55 100%)'
  // #2c3e50 - #4ca1af
  // #4b79a1 - #283e51
})
