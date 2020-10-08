<template>
  <div class="prospect">
    <h3 class="center color-main">Prospecto</h3>
    <hr>

    <div class="data">
      <!-- data -->
      asdf
    </div>
  </div>
</template>

<script>
import M from 'materialize-css'
import ProspectsService from '@/services/ProspectsService'

export default {
  name: 'Prospect',
  data () {
    return {
      firstname: '',
      lastname1: '',
      lastname2: '',
      street: '',
      housenumber: '',
      suburb: '',
      postalcode: '',
      phone: '',
      RFC: '',
      docs: [],
      status: '',
      description: ''
    }
  },
  mounted () {
    this.getProspect()
  },
  methods: {
    async getProspect () {
      const response = await ProspectsService.getProspect({
        id: this.$route.params.id
      })
      this.firstname = response.data.firstname
      this.lastname1 = response.data.lastname1
      this.lastname2 = response.data.lastname2
      this.street = response.data.street
      this.housenumber = response.data.housenumber
      this.suburb = response.data.suburb
      this.postalcode = response.data.postalcode
      this.phone = response.data.phone
      this.RFC = response.data.RFC
      this.docs = response.data.docs
      this.status = response.data.status
      this.description = response.data.description
    },

    empty (data) {
      return ['', null, undefined].includes(data) ? '(Vacío)' : data
    }
  }
}
</script>
