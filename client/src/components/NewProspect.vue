<template>
  <div class="prospects">
    <h3 class="center color-main">Evaluar Prospecto</h3>
    <hr>

    <div class="row">
      <div class="input-field col m12 s12">
        <input id="name" type="text" v-model="firstname">
        <label for="name">Nombre(s)</label>
      </div>

      <div class="input-field col m6 s12">
        <input id="lastname1" type="text" v-model="lastname1">
        <label for="lastname1">Apellido Paterno</label>
      </div>

      <div class="input-field col m6 s12">
        <input id="lastname2" type="text" v-model="lastname2">
        <label for="lastname2">Apellido Materno</label>
      </div>

      <div class="input-field col m6 s12">
        <input id="street" type="text" v-model="street">
        <label for="street">Calle</label>
      </div>
      <div class="input-field col m6 s12">
        <input id="housenumber" type="text" v-model="housenumber">
        <label for="housenumber">Nº</label>
      </div>

      <div class="input-field col m6 s12">
        <input id="suburb" type="text" v-model="suburb">
        <label for="suburb">Colonia</label>
      </div>

      <div class="input-field col m6 s12">
        <input id="CP" type="text" v-model="postalcode">
        <label for="CP">Código Postal</label>
      </div>

      <div class="input-field col m6 s12">
        <input id="postalcode" type="text" v-model="phone">
        <label for="postalcode">Teléfono</label>
      </div>

      <div class="input-field col m6 s12">
        <input id="RFC" type="text" v-model="RFC">
        <label for="RFC">RFC</label>
      </div>

      <div class="file-field input-field col m12 s12">
        <div class="btn p-0">
          <span><i class="material-icons px-1">file_upload</i></span>
          <input name="Imagen de Variante" accept="docs/*" type="file" ref="file" v-on:change="selectFile()" class="m-0 p-0 inputFile">
        </div>
        <div class="file-path-wrapper">
          <input class="file-path file-pathV" type="text" placeholder="Subir una Imagen">
        </div>
      </div>

      <div class="input-field col m6 s12">
        <input id="docName" type="text" v-model="docName">
        <label for="docName">Nombre: </label>
      </div>

      <div>
        <button :disabled="lock" class="app_prospect_btn" @click="createProspect">Add</button>
      </div>
    </div>
  </div>
</template>

<script>
import ProspectsService from '@/services/ProspectsService'
export default {
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
      docName: '',

      lock: false
    }
  },
  methods: {
    async createProspect () {
      let me = this
      const data = {
        firstname: this.firstname,
        lastname1: this.lastname1,
        lastname2: this.lastname2,
        street: this.street,
        housenumber: this.housenumber,
        suburb: this.suburb,
        postalcode: this.postalcode,
        phone: this.phone,
        RFC: this.RFC,
        docs: this.docs
      }

      const megaBytes = this.size(data)

      if (megaBytes < 2) {
        me.lock = true
        await ProspectsService.createProspect({
          firstname: this.firstname,
          lastname1: this.lastname1,
          lastname2: this.lastname2,
          street: this.street,
          housenumber: this.housenumber,
          suburb: this.suburb,
          postalcode: this.postalcode,
          phone: this.phone,
          RFC: this.RFC,
          docs: this.docs
        })
        this.$router.push({ name: 'Prospects' })
      } else {
        alert(`Size: ${this.fixed(megaBytes)}MB`)
        me.lock = false
      }
    },

    /* Select a Doc */
    selectFile () {
      let me = this

      const getBase64 = (file) => {
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
          const file = {
            name: 'Doc',
            data: data
          }
          me.docs.push(file)
        }
      )
    },

    size (data) {
      const size = new TextEncoder().encode(JSON.stringify(data)).length
      const kiloBytes = size / 1024
      const megaBytes = kiloBytes / 1024
      return megaBytes
    },

    /* Fix a Number */
    fixed (number) {
      return Number(number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    }
  }
}
</script>
<style type="text/css">
.form input, .form textarea {
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
