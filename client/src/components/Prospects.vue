<template>
  <div class="prospects">
    <h3 class="center color-main">Prospectos</h3>
    <hr>

    <!-- add -->
    <div class="fixed-action-btn">
      <router-link id="add" v-bind:to="{ name: 'NewProspect' }" class="btn-floating btn-large waves-effect waves-light tooltipped" data-position="left" data-tooltip="Agregar Prospecto">
        <i class="material-icons large">add</i>
      </router-link>
      <!-- Tap Target Structure -->
      <div class="tap-target bg-submain" data-target="add">
        <div class="tap-target-content white-text">
          <h5>Agregar Prospecto</h5>
          <p>Hey Promotor! Registra un nuevo prospecto a cliente para empezar a usar el sistema!</p>
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
              <span v-if="_.status == 1" class="badge bg-secondary">Enviado</span>
              <span v-else-if="_.status == 2" class="badge bg-main">Autorizado</span>
              <span v-else class="badge bg-error">Rechazado</span>
            </td>
            <td align="center">
              <router-link class="btn waves-effect waves-light bg-submain tooltipped" data-position="top" data-tooltip="Ver" v-bind:to="{ name: 'Prospect', params: { id: _._id } }">
                <i class="material-icons">visibility</i>
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
import M from 'materialize-css'
import ProspectsService from '@/services/ProspectsService'

export default {
  name: 'Prospects',
  data () {
    return {
      prospects: []
    }
  },
  methods: {
    async getProspects () {
      const response = await ProspectsService.fetchProspects()
      this.prospects = response.data.prospects
    },

    empty (data) {
      return ['', null, undefined].includes(data) ? '(Vacío)' : data
    }
  },
  mounted () {
    this.getProspects()
    // this.$alert_error.fire({
    //   html: '<h5 class="bold">Ha ocurrido un error!</h5>' +
    //         '<span>Intente realizar de nuevo la operación y si persiste el problema favor de contactar al Soporte Técnico</span>',
    //   confirmButtonText: 'Aceptar'
    // }).then(() => {})
  },
  updated () {
    M.Tooltip.init(document.querySelectorAll('.tooltipped'), {})
    M.TapTarget.init(document.querySelector('.tap-target'), {})
    if (!this.prospects.length) {
      M.TapTarget.getInstance(document.querySelector('.tap-target')).open()
    }
  }
}
</script>
