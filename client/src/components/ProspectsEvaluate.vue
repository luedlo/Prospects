<template>
  <div class="prospect">
    <loader v-if="loader"/>
    <h4 class="center color-main">Prospectos</h4>
    <hr>

    <!-- Filters -->
    <div class="col m12 s12 mt-1">
      <div class="row m-0">
        <div class="input-field col m1 s2 py-1 center">
          <i class="material-icons">filter_list</i>
        </div>
        <div class="input-field col m4 s10">
          <input v-model="search" id="name" type="text" v-on:keyup.enter="filter()">
          <label for="name">Nombre</label>
        </div>
        <div class="input-field col m3 s12">
          <select v-model="criterion" v-on:change="filter()">
            <option value="firstname">Nombre(s)</option>
            <option value="lastname1">A. Paterno</option>
            <option value="lastname2">A. Materno</option>
          </select>
          <label>Estatus</label>
        </div>
        <div class="input-field col m2 s9">
          <select v-model="status" v-on:change="filter()">
            <option value="1">Enviado</option>
            <option value="2">Autorizado</option>
            <option value="3">Rechazado</option>
            <option value="">Todos</option>
          </select>
          <label>Estatus</label>
        </div>
        <div class="input-field col m2 s3 center">
          <a class="btn-floating waves-effect waves-light" @click="filter()">
            <i class="material-icons">search</i>
          </a>
        </div>
      </div>
    </div>

    <div v-if="prospects.length > 0">
      <!-- data -->
      <table class="striped centered responsive-table z-depth-1">
        <thead class="bg-submain white-text">
          <tr>
            <th>Nombre(s)</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
            <th>Estatus</th>
            <th align="center">Acciones</th>
          </tr>
        </thead>
        <tbody class="white">
          <tr v-for="(_, index) in prospects" :key="index">
            <td>{{ empty(_.firstname) }}</td>
            <td>{{ empty(_.lastname1) }}</td>
            <td>{{ empty(_.lastname2) }}</td>
            <td>
              <span v-if="_.status == 1" class="badge bg-main">Enviado</span>
              <span v-else-if="_.status == 2" class="badge bg-secondary">Autorizado</span>
              <span v-else class="badge bg-error">Rechazado</span>
            </td>
            <td>
              <router-link class="btn waves-effect waves-light bg-submain tooltipped" data-position="top" data-tooltip="Ver" v-bind:to="{ name: 'Prospect', params: { id: _._id } }">
                <i class="material-icons">visibility</i>
              </router-link>
              <router-link v-if="_.status == 1" class="btn waves-effect waves-light bg-warning tooltipped" data-position="top" data-tooltip="Evaluar" v-bind:to="{ name: 'EditProspect', params: { id: _._id } }">
                <i class="material-icons">assignment</i>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="grey-text center" v-else>
      <i class="material-icons large">person</i>
      <h5 class="m-0">No hay Prospectos</h5>
    </div>
  </div>
</template>

<script>
import loader from '@/Loader'
import M from 'materialize-css'
import ProspectsService from '@/services/ProspectsService'

export default {
  name: 'ProspectsEvaluate',
  components: { loader },
  data () {
    return {
      prospects: [],
      loader: true,

      criterion: 'firstname',
      search: '',
      status: ''
    }
  },
  methods: {
    async getProspects () {
      await ProspectsService.fetchProspects().then((response) => {
        const data = response.data
        this.prospects = data.prospects
        this.loader = false
      }).catch((error) => {
        this.loader = false
        this.$alert_error.fire({
          html: '<h5 class="bold">Ha ocurrido un error!</h5>' +
                `<em class="grey-text">${error}</em><br><br>` +
                '<span>Intente realizar de nuevo la operación y si persiste el problema favor de contactar al Soporte Técnico</span>',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          this.$router.push({ name: 'HelloWorld' })
        })
      })
    },

    async filter () {
      await this.getProspects()
      this.prospects = this.prospects.filter(prospect => {
        switch (this.criterion) {
          case 'firstname':
            return prospect.firstname.toLowerCase().includes(this.search.toLowerCase()) && prospect.status.includes(this.status)
          case 'lastname1':
            return prospect.lastname1.toLowerCase().includes(this.search.toLowerCase()) && prospect.status.includes(this.status)
          case 'lastname2':
            return prospect.lastname2.toLowerCase().includes(this.search.toLowerCase()) && prospect.status.includes(this.status)
        }
      })
    },

    empty (data) {
      return ['', null, undefined].includes(data) ? '(Vacío)' : data
    }
  },
  mounted () {
    this.getProspects()
    M.TapTarget.init(document.querySelector('.tap-target'), {})
  },
  updated () {
    M.Tooltip.init(document.querySelectorAll('.tooltipped'), {})
    M.FormSelect.init(document.querySelectorAll('select'), {})
    if (!this.prospects.length) {
      M.TapTarget.getInstance(document.querySelector('.tap-target')).open()
    }
  }
}
</script>
