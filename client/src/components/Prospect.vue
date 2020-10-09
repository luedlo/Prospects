<template>
  <div class="prospect">
    <div class="col m12 s12 content">
      <!-- img -->
      <div class="row img bg-main">
        <div class="col m4 s12 center">
          <div class="col m12 s12 pt-3">
            <i class="material-icons large circle grey p-2 z-depth-2">person</i>
          </div>
          <div class="col m12 s12 center py-1">
            <!-- status -->
            <span>
              <span v-if="status == 1" class="badge bg-main m-0">Enviado</span>
              <span v-else-if="status == 2" class="badge bg-secondary m-0">Autorizado</span>
              <span v-else class="badge bg-error m-0">Rechazado</span>
            </span>
          </div>
        </div>
        <div class="col m8 s12 my-2">
          <div class="col m12 s12">
            <h6 class="bold">Nombre(s):</h6>
            <span>{{ empty(firstname) }}</span>
          </div>

          <div class="col m6 s12 mt-1">
            <h6 class="bold">Apellido Paterno:</h6>
            <span>{{ empty(lastname1) }}</span>
          </div>
          <div class="col m6 s12 mt-1">
            <h6 class="bold">Apellido Materno:</h6>
            <span>{{ empty(lastname2) }}</span>
          </div>
        </div>
      </div>

      <!-- actions -->
      <div class="halfway">
        <router-link class="btn-floating btn-large waves-effect waves-light bg-warning tooltipped mr-1" data-position="top" data-tooltip="Evaluar" v-bind:to="{ name: 'EditProspect', params: { id: id } }">
          <i class="material-icons">assignment</i>
        </router-link>
        <a class="btn-floating btn-large waves-effect waves-light bg-error tooltipped" data-position="top" data-tooltip="Eliminar" href @click.prevent="deleteProspect">
          <i class="material-icons">delete</i>
        </a>
      </div>

      <!-- data -->
      <div class="row data">
        <div class="col m12 s12 mb-2">
          <div class="col m6 s12">
            <h6 class="bold">Calle:</h6>
            <span>{{ empty(street) }}</span>
          </div>
          <div class="col m6 s12">
            <h6 class="bold">Nº de Casa:</h6>
            <span>{{ empty(housenumber) }}</span>
          </div>

          <div class="col m6 s12 mt-1">
            <h6 class="bold">Colonia:</h6>
            <span>{{ empty(suburb) }}</span>
          </div>
          <div class="col m6 s12 mt-1">
            <h6 class="bold">Código Postal:</h6>
            <span>{{ empty(postalcode) }}</span>
          </div>

          <div class="col m6 s12 mt-1">
            <h6 class="bold">Teléfono:</h6>
            <span>{{ empty(phone) }}</span>
          </div>
          <div class="col m6 s12 mt-1">
            <h6 class="bold">RFC:</h6>
            <span>{{ empty(RFC) }}</span>
          </div>

          <div v-if="status == 3" class="col m12 s12 mt-1">
            <h6 class="bold">Descripción:</h6>
            <span>{{ empty(description) }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="col m12 s12 content">
      <!-- docs -->
      <div class="row docs bg-submain center pb-2">
        <h5 class="pt-2 mb-0">Documentos</h5>
        <span class="grey-text">
          (<em><strong>Archivos</strong></em>: {{ docs.length }} |
          <em><strong>Tamaño Total</strong></em>:
          {{ size(docs) }} MB)
          </span>
      </div>

      <!-- data -->
      <div class="row data">
        <div v-if="docs.length">
          <a v-for="(_, index) in docs" :key="index" @click="doc = _" class="col m3 s6 waves-effect center modal-trigger" href="#preview">
            <i class="material-icons large color-secondary">insert_drive_file</i>
            <span class="info grey-text">
              <span class="uppercase">{{ type(_.data) }}</span>
              | {{ size(_.data) }} MB
            </span>
            <h6>{{ _.name }}</h6>
          </a>
        </div>
        <div class="grey-text center mb-2" v-else>
          <i class="material-icons large">insert_drive_file</i>
          <h5 class="m-0">No hay Documentos</h5>
        </div>
      </div>
    </div>

    <!-- Modal Structure -->
    <div id="preview" class="modal bottom-sheet">
      <div class="modal-content center grey">
        <h5 class="bg-secondary m-0 p-3 white-text">
          Visualizando: "{{ `${doc.name}.${type(doc.data)}` }}"
        </h5>
        <object v-if="!errorOnLoad" :data="doc.data" class="p-2" width="100%" @error="errorOnLoad = true" height="77%">
            <embed :src="doc.data" type="application/*" />
        </object>
        <div v-if="errorOnLoad" class="mt-5">
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
import M from 'materialize-css'
import ProspectsService from '@/services/ProspectsService'

export default {
  data () {
    return {
      id: '',
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
      description: '',

      doc: [
        'name',
        'data'
      ],
      embedHeight: 500,
      errorOnLoad: false
    }
  },
  methods: {
    async getProspect () {
      const response = await ProspectsService.getProspect({
        id: this.id
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

    deleteProspect () {
      this.$alert_warning.fire({
        html: '<h5 class="bold">Eliminar Prospecto</h5>' +
              '<span>¿Estás seguro que deseas eliminarlo?<br><p class="grey-text">(Esta acción no es revertible!)</p></span>',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await ProspectsService.deleteProspect(this.id)
          this.$router.push({ name: 'Prospects' })
          this.$alert_success.fire({
            icon: 'success',
            title: 'Eliminado',
            text: 'El Prospecto ha sido eliminado!',
            confirmButtonText: 'Aceptar'
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
      return data ? data.split('/')[1].split(';')[0] : null
    },

    /* Fix a Number */
    fixed (number) {
      return Number(number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    },

    empty (data) {
      return ['', null, undefined].includes(data) ? '(Vacío)' : data
    }
  },
  created () {
    this.id = this.$route.params.id
  },
  mounted () {
    this.getProspect()
    M.Tooltip.init(document.querySelectorAll('.tooltipped'), {})
    M.Modal.init(document.querySelectorAll('.modal'), {})
  }
}
</script>
