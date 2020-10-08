
<template>
  <div class="prospects">
    <h1>Edit Prospect</h1>
      <div class="form">
        <div>
          <input type="text" placeholder="Nombre(s)" v-model="firstname">
        </div>
        <div>
          <input type="text" placeholder="Apellido Paterno" v-model="lastname1">
        </div>
        <div>
          <input type="text" placeholder="Apellido Materno" v-model="lastname2">
        </div>
        <div>
          <input type="text" placeholder="Calle" v-model="street">
        </div>
        <div>
          <input type="text" placeholder="Nº" v-model="housenumber">
        </div>
        <div>
          <input type="text" placeholder="Colonia" v-model="suburb">
        </div>
        <div>
          <input type="text" placeholder="C.P." v-model="postalcode">
        </div>
        <div>
          <input type="text" placeholder="Teléfono" v-model="phone">
        </div>
        <div>
          <input type="text" placeholder="RFC" v-model="RFC">
        </div>
        <div class="btn p-0">
          <span><i class="material-icons px-1">file_upload</i></span>
          <input name="Imagen de Variante" accept="docs/*" type="file" ref="file" v-on:change="selectFile()" class="m-0 p-0 inputFile">
        </div>
        <div class="file-path-wrapper">
          <input class="file-path file-pathV" type="text" placeholder="Subir una Imagen">
        </div>
        <div>
          <select v-model="status">
            <option disabled value="">Elige uno...</option>
            <option value="1">Enviado</option>
            <option value="2">Autorizado</option>
            <option value="3">Rechazado</option>
          </select>
        </div>
        <div>
          <button :disabled="lock" class="app_prospect_btn" @click="updateProspect">Update</button>
        </div>
      </div>
  </div>
</template>

<script>
import ProspectsService from '@/services/ProspectsService'
export default {
  name: 'EditProspect',
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

      file: '',
      lock: false
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
    },

    async updateProspect () {
      const data = {
        id: this.$route.params.id,
        firstname: this.firstname,
        lastname1: this.lastname1,
        lastname2: this.lastname2,
        street: this.street,
        housenumber: this.housenumber,
        suburb: this.suburb,
        postalcode: this.postalcode,
        phone: this.phone,
        RFC: this.RFC,
        docs: this.docs,
        status: this.status
      }

      const size = new TextEncoder().encode(JSON.stringify(data)).length
      const kiloBytes = size / 1024
      const megaBytes = kiloBytes / 1024

      if (megaBytes < 2) {
        await ProspectsService.updateProspect({
          id: this.$route.params.id,
          firstname: this.firstname,
          lastname1: this.lastname1,
          lastname2: this.lastname2,
          street: this.street,
          housenumber: this.housenumber,
          suburb: this.suburb,
          postalcode: this.postalcode,
          phone: this.phone,
          RFC: this.RFC,
          docs: this.docs,
          status: this.status
        })
        this.$router.push({ name: 'Prospects' })
      } else {
        alert(`Size: ${this.fixed(megaBytes)}MB`)
      }
    },

    /* Select a Doc */
    selectFile () {
      let me = this
      me.lock = true

      function getBase64 (file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => resolve(reader.result)
          reader.onerror = error => reject(error)
        })
      }

      const file = document.querySelector('.inputFile').files[0]
      getBase64(file).then(
        data => {
          me.docs.push(data)
          console.log(me.docs)
          me.lock = false
        }
      )
    },

    /* Fix a Number */
    fixed (number) {
      return Number(number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    }
  }
}
</script>
<style type="text/css">
.form input, .form textarea, .form select {
  width: 500px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
}
.form div {
  margin: 20px;
}
.app_prospect_btn {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 520px;
  border: none;
  cursor: pointer;
}
</style>
