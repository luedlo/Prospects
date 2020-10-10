<template>
  <div class="prospect">
    <div class="col m12 s12 content">
      <!-- title -->
      <div class="row docs bg-submain center pb-2">
        <h5 class="pt-2 mb-0">Nuevo Prospecto</h5>
      </div>

      <!-- data -->
      <div class="row data">
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
      </div>
    </div>

    <div class="col m12 s12 content">
      <!-- docs -->
      <div class="row docs bg-submain center pb-2">
        <h5 class="pt-2 mb-0">Documentos</h5>
        <span class="grey-text">
          (<em><strong>Archivos</strong></em>: {{ docs.length }} |
          <em><strong>Tamaño</strong></em>:
          <span :class="[size(docs)<2 ? 'grey-text' : 'red-text']">{{ size(docs) }}MB</span>/2MB)
          </span>
      </div>

      <!-- actions -->
      <div class="halfway">
        <a @click="doc = {'name':'','data':''}, modal = true" class="btn-floating btn-large waves-effect waves-light btn modal-trigger" href="#addDoc">
          <i class="material-icons">add</i>
        </a>
      </div>

      <!-- data -->
      <div class="row data">
        <div v-if="docs.length">
          <a v-for="(_, index) in docs" :key="index" @click="doc = _" class="col m3 s6 waves-effect center modal-trigger" href="#preview">
            <a @click.prevent="docs.splice(index, 1)" class="btn-floating waves-effect waves-light red remove">
              <i class="material-icons">close</i>
            </a>
            <i class="material-icons large color-secondary">
              insert_drive_file
            </i>
            <span class="info grey-text">
              <span class="uppercase">{{ type(_.data) }}</span>
              | {{ size(_.data) }} MB
            </span>
            <h6>{{ _.name }}</h6>
          </a>
        </div>
        <div class="grey-text center mb-2 mt-1" v-else>
          <i class="material-icons large">insert_drive_file</i>
          <h5 class="m-0">No hay Documentos</h5>
        </div>
      </div>
    </div>

    <!-- actions -->
    <div class="col m12 s12 mb-5 center">
      <button :disabled="lock" class="btn waves-effect waves-light" @click="createProspect">
        <i class="material-icons left">send</i>
        Enviar
      </button>
      <button :disabled="lock" class="btn waves-effect waves-light bg-error" @click="cancel">
        <i class="material-icons left">close</i>
        Salir
      </button>
    </div>

    <!-- Modal Structure -->
    <div id="addDoc" class="modal modal-fixed-footer">
      <div class="modal-content">
        <h5 class="bg-main p-2 m-0 white-text">Agregar Documento</h5>
        <div class="row">
          <div v-if="modal" class="col m12 s12 center pt-1">
            <object v-if="!errorOnLoad && doc.data" :data="doc.data" width="100%" @error="errorOnLoad = true" height="250px">
              <embed :src="doc.data" type="application/*" />
            </object>
            <div v-else-if="errorOnLoad && doc.data" class="mt-5">
              <i class="material-icons large">insert_drive_file</i>
              <h6>
                No ha sido posible cargar el documento.
                <br>
                Es posible que el contenido haya sido bloqueado por el navegador o éste dañado
              </h6>
            </div>
            <div v-else class="grey-text">
              <i class="material-icons large">insert_drive_file</i>
              <h6>Documento (JPG/PNG/PDF)</h6>
              <span>(Sin documento seleccionado)</span>
            </div>
          </div>

          <div v-if="modal" class="col m12 s12">
            <div class="file-field input-field col m12 s12 my-0">
              <div class="btn p-0">
                <span><i class="material-icons px-1">file_upload</i></span>
                <input name="Documento" accept="docs/*" type="file" ref="file" v-on:change="selectFile()" class="m-0 p-0 inputFile">
              </div>
              <div class="file-path-wrapper">
                <input class="file-path file-pathV" type="text" placeholder="Subir un Documento">
              </div>
            </div>

            <div class="input-field col m12 s12">
              <input id="docName" type="text" v-model="doc.name">
              <label for="docName">Nombre</label>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <a @click="docs.push(doc), modal = false" class="modal-close waves-effect waves-green green-text btn-flat">Agregar</a>
        <a @click="modal = false" class="modal-close waves-effect waves-red red-text btn-flat">Cancelar</a>
      </div>
    </div>
  </div>
</template>

<script>
import M from 'materialize-css'
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

      doc: {
        name: '',
        data: ''
      },
      lock: false,
      modal: false,
      errorOnLoad: false
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
        }).then((res) => {
          if (res.data.success) {
            this.$alert_success.fire({
              title: 'Creado',
              text: res.data.message,
              confirmButtonText: 'Aceptar'
            })
          } else {
            this.$alert_error.fire({
              title: 'Error',
              text: res.data.message,
              confirmButtonText: 'Aceptar'
            })
            location.reload()
          }
        }).catch(() => {
          this.$alert_error.fire({
            html: '<h5 class="bold">Ha ocurrido un error!</h5>' +
                  '<span>Intente realizar de nuevo la operación y si persiste el problema favor de contactar al Soporte Técnico</span>',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            me.lock = false
          })
        })
        this.$router.push({ name: 'Prospects' })
      } else {
        this.$alert_warning.fire({
          html: '<h5 class="bold">Límite de Megabytes excedido</h5>' +
                `<em class="grey-text">(<span class="red-text">${this.fixed(megaBytes)}MB</span> / 2MB)</em><br>` +
                '<span>Considera usar archivos o formatos más ligeros!</span>',
          confirmButtonText: 'Aceptar'
        })
        me.lock = false
      }
    },

    /* Select a Doc */
    selectFile () {
      let me = this
      me.errorOnLoad = false

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
          const megabytes = me.size(data)
          if (megabytes >= 2) {
            me.modal = false
            me.doc = {
              name: '',
              data: ''
            }
            this.$alert_warning.fire({
              html: '<h5 class="bold">Límite de Megabytes excedido</h5>' +
                    `<em class="grey-text">(<span class="red-text">${this.fixed(megabytes)}MB</span> / 2MB)</em><br>` +
                    '<span>Considera usar archivos o formatos más ligeros!</span>',
              confirmButtonText: 'Aceptar'
            })
          } else {
            me.doc.data = data
          }
        }
      ).finally(() => {
        me.modal = true
      })
    },

    size (data) {
      const size = new TextEncoder().encode(JSON.stringify(data)).length
      const kiloBytes = size / 1024
      const megaBytes = kiloBytes / 1024
      return this.fixed(megaBytes)
    },

    type (data) {
      return data ? data.split('/')[1].split(';')[0] : null
    },

    /* Fix a Number */
    fixed (number) {
      return Number(number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    },

    cancel () {
      this.$alert_warning.fire({
        html: '<h5 class="bold">¿Estás seguro que deseas salir?</h5>' +
              '<span>Al salir perderas toda la información ya capturada!</span>',
        showCancelButton: true,
        confirmButtonText: 'Salir',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.$router.push({ name: 'Prospects' })
        }
      })
    }
  },
  mounted () {
    M.Modal.init(document.querySelectorAll('.modal'), {})
  }
}
</script>
