<template>
  <div class="prospect">
    <loader v-if="loader"/>
    <div class="col m12 s12 content">
      <!-- title -->
      <div class="row docs bg-submain center pb-2">
        <h5 class="pt-2 mb-0">Nuevo Prospecto</h5>
        <strong><em class="grey-text">(Los campos con <span class="color-error">*</span> son obligatorios!)</em></strong>
      </div>

      <!-- data -->
      <div class="row data">
        <div class="col m12 s12">
          <div class="input-field col m12 s12" :class="{ 'error': hasError('Nombre(s)') }">
            <input name="Nombre(s)" data-vv-scope="new" v-validate="'required|max:50'" id="name" type="text" v-model="firstname">
            <label for="name">Nombre(s) <span class="color-error">*</span></label>
            <strong class="color-error"><em>{{ error('Nombre(s)') }}</em></strong>
          </div>
        </div>

        <div class="col m12 s12">
          <div class="input-field col m6 s12" :class="{ 'error': hasError('Apellido Paterno') }">
            <input name="Apellido Paterno" data-vv-scope="new" v-validate="'required|max:50'" id="lastname1" type="text" v-model="lastname1">
            <label for="lastname1">Apellido Paterno <span class="color-error">*</span></label>
            <strong class="color-error"><em>{{ error('Apellido Paterno') }}</em></strong>
          </div>

          <div class="input-field col m6 s12" :class="{ 'error': hasError('Apellido Materno') }">
            <input name="Apellido Materno" data-vv-scope="new" v-validate="'max:50'" id="lastname2" type="text" v-model="lastname2">
            <label for="lastname2">Apellido Materno</label>
            <strong class="color-error"><em>{{ error('Apellido Materno') }}</em></strong>
          </div>
        </div>

        <div class="col m12 s12">
          <div class="input-field col m6 s12" :class="{ 'error': hasError('Calle') }">
            <input name="Calle" data-vv-scope="new" v-validate="'required|max:50'" id="street" type="text" v-model="street">
            <label for="street">Calle <span class="color-error">*</span></label>
            <strong class="color-error"><em>{{ error('Calle') }}</em></strong>
          </div>

          <div class="input-field col m6 s12" :class="{ 'error': hasError('Nº') }">
            <input name="Nº" data-vv-scope="new" v-validate="'required|numeric|max:10'" id="housenumber" type="text" v-model="housenumber">
            <label for="housenumber">Nº <span class="color-error">*</span></label>
            <strong class="color-error"><em>{{ error('Nº') }}</em></strong>
          </div>
        </div>

        <div class="col m12 s12">
          <div class="input-field col m6 s12" :class="{ 'error': hasError('Colonia') }">
            <input name="Colonia" data-vv-scope="new" v-validate="'required|max:50'" id="suburb" type="text" v-model="suburb">
            <label for="suburb">Colonia <span class="color-error">*</span></label>
            <strong class="color-error"><em>{{ error('Colonia') }}</em></strong>
          </div>

          <div class="input-field col m6 s12" :class="{ 'error': hasError('Código Postal') }">
            <input name="Código Postal" data-vv-scope="new" v-validate="'required|numeric|max:5'" id="postalcode" type="text" v-model="postalcode">
            <label for="postalcode">Código Postal <span class="color-error">*</span></label>
            <strong class="color-error"><em>{{ error('Código Postal') }}</em></strong>
          </div>
        </div>

        <div class="col m12 s12">
          <div class="input-field col m6 s12" :class="{ 'error': hasError('Teléfono') }">
            <input name="Teléfono" data-vv-scope="new" v-validate="'required|numeric|max:10'" id="phone" type="text" v-model="phone">
            <label for="phone">Teléfono <span class="color-error">*</span></label>
            <strong class="color-error"><em>{{ error('Teléfono') }}</em></strong>
          </div>

          <div class="input-field col m6 s12" :class="{ 'error': hasError('RFC') }">
            <input name="RFC" data-vv-scope="new" v-validate="'required|max:13'" id="RFC" type="text" v-model="RFC">
            <label for="RFC">RFC <span class="color-error">*</span></label>
            <strong class="color-error"><em>{{ error('RFC') }}</em></strong>
          </div>
        </div>
      </div>
    </div>

    <!-- Docs -->
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
          <div v-for="(_, index) in docs" :key="index" class="col m3 s6 waves-effect center modal-trigger">
            <a @click.prevent="docs.splice(index, 1)" class="btn-floating waves-effect waves-light red remove">
              <i class="material-icons">close</i>
            </a>
            <a @click="doc = _, modal = true" class="modal-trigger" href="#preview">
              <i class="material-icons large color-secondary">insert_drive_file</i>
            </a>
            <span class="info grey-text">
              <span class="uppercase">{{ type(_.data) }}</span>
              | {{ size(_.data) }} MB
            </span>
            <h6>{{ _.name }}</h6>
          </div>
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
              <h6 class="m-0">Documento</h6>
              <p class="m-0">( jpg, png, svg, ico, rar, zip, pdf, docx, pptx, xlsx )</p>
              <span>(Sin documento seleccionado)</span>
            </div>
          </div>

          <div v-if="modal" class="col m12 s12">
            <div class="file-field input-field col m12 s12 my-0" :class="{ 'error': hasError('Nombre') }">
              <div class="btn p-0">
                <span><i class="material-icons px-1">file_upload</i></span>
                <input name="Documento" data-vv-scope="add" v-validate="'required|ext:jpg,png,svg,ico,rar,zip,pdf,docx,pptx,xlsx'" accept="docs/*" type="file" ref="file" v-on:change="selectFile()" class="m-0 p-0 inputFile">
              </div>
              <div class="file-path-wrapper">
                <input class="file-path file-pathV" type="text" placeholder="Subir un Documento">
              </div>
              <strong class="color-error"><em>{{ error('Documento') }}</em></strong>
            </div>

            <div class="input-field col m12 s12" :class="{ 'error': hasError('Nombre') }">
              <input name="Nombre" data-vv-scope="add" v-validate="'required|max:25'" id="docName" type="text" v-model="doc.name">
              <label for="docName">Nombre <span class="color-error">*</span></label>
              <strong class="color-error"><em>{{ error('Nombre') }}</em></strong>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <a @click="addDoc" class="waves-effect waves-green green-text btn-flat">Agregar</a>
        <a @click="modal = false" class="modal-close close-doc waves-effect waves-red red-text btn-flat">Cancelar</a>
      </div>
    </div>

    <!-- Modal Structure -->
    <div id="preview" class="modal bottom-sheet">
      <div v-if="modal" class="modal-content center grey">
        <h5 class="bg-secondary m-0 p-3 white-text">
          Visualizando: "{{ `${doc.name}.${type(doc.data)}` }}"
        </h5>
        <object v-if="!errorOnLoad" :data="doc.data" class="p-2" width="100%" @error="errorOnLoad = true" height="80%">
            <embed :src="doc.data" type="application/*" />
        </object>
        <div v-else class="mt-5">
          <i class="material-icons large">insert_drive_file</i>
          <h6>
            No ha sido posible cargar el documento.
            <br>
            Es posible que el contenido haya sido bloqueado por el navegador o éste dañado, intenta descargandolo:
          </h6>
          <a :href="doc.data" download class="btn waves-effect waves-light">
            <i class="material-icons left">file_download</i>
            {{ `${doc.name}.${type(doc.data)}` }}
          </a>
        </div>
      </div>
      <div class="modal-footer">
        <a class="modal-close waves-effect red-text btn-flat">Cerrar</a>
      </div>
    </div>
  </div>
</template>

<script>
import loader from '@/Loader'
import M from 'materialize-css'
import ProspectsService from '@/services/ProspectsService'

export default {
  components: { loader },
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
      errorOnLoad: false,
      loader: true
    }
  },
  methods: {
    createProspect () {
      let me = this
      me.$validator.validateAll('new').then(async valid => {
        if (valid) {
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
            this.loader = true
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
                this.loader = false
                this.$alert_success.fire({
                  title: 'Creado',
                  text: res.data.message,
                  confirmButtonText: 'Aceptar'
                })
              } else {
                this.loader = false
                this.$alert_error.fire({
                  title: 'Error',
                  text: res.data.message,
                  confirmButtonText: 'Aceptar'
                }).then(() => {
                  this.$router.push({ name: 'Prospects' })
                })
              }
            }).catch(() => {
              this.loader = false
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
        } else {
          window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
          })

          M.toast({
            html: 'Corrige la información e intenta de nuevo!',
            classes: 'rounded bg-error'
          })
        }
      })
    },

    /* Select a Doc */
    selectFile () {
      let me = this
      this.loader = true
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
      if (file && ((file.size / 1024) / 1024) <= 2) {
        getBase64(file).then(
          async data => {
            const d = await data
            const megabytes = me.size(d)
            console.log(megabytes)
            if (megabytes >= 2) {
              me.modal = false
              me.doc = {
                name: '',
                data: ''
              }
              me.loader = false
              this.$alert_warning.fire({
                html: '<h5 class="bold">Límite de Megabytes excedido</h5>' +
                      `<em class="grey-text">(<span class="red-text">${this.fixed(megabytes)}MB</span> / 2MB)</em><br>` +
                      '<span>Considera usar archivos o formatos más ligeros!</span>',
                confirmButtonText: 'Aceptar'
              })
            } else {
              me.doc.data = data
              me.loader = false
            }
          }
        ).finally(() => {
          me.loader = false
          me.modal = true
        })
      } else {
        me.modal = false
        me.doc.data = ''
        me.loader = false
        me.modal = true
      }
    },

    addDoc () {
      let me = this
      me.$validator.validateAll('add').then(valid => {
        if (valid) {
          me.docs.push(me.doc)
          me.modal = false
          document.querySelector('.close-doc').click()
        } else {
          M.toast({
            html: 'Corrige la información e intenta de nuevo!',
            classes: 'rounded bg-error'
          })
        }
      })
    },

    size (data) {
      const size = new TextEncoder().encode(JSON.stringify(data)).length
      const kiloBytes = size / 1024
      const megaBytes = kiloBytes / 1024
      return this.fixed(megaBytes)
    },

    type (data) {
      return data ? data.split('/')[1].split(';')[0].split('+')[0] : '?'
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
    },

    error (name) {
      const error = this.errors.items.find(el => el.field === name)
      return error ? error.msg : ''
    },

    hasError (name) {
      const error = this.errors.items.find(el => el.field === name)
      return error || false
    }
  },
  mounted () {
    M.Modal.init(document.querySelectorAll('.modal'), {})
    setTimeout(() => { this.loader = false }, 1000)
  }
}
</script>
