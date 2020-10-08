<template>
  <div class="prospects">
    <h3>Prospectos</h3>

    <!-- add -->
    <div class="fixed-action-btn">
      <router-link id="add" v-bind:to="{ name: 'NewProspect' }" class="btn-floating btn-large waves-effect waves-light">
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

    <div v-if="prospects.length > 0" class="table-wrap">
      <!-- data -->
      <table>
        <thead class="bg-submain white-text">
          <tr>
            <th>Nombre(s)</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
            <th>Estatus</th>
            <th align="center">Acciones</th>
          </tr>
        </thead>
        <tbody>
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
              <router-link class="btn waves-effect waves-light bg-warning" v-bind:to="{ name: 'EditProspect', params: { id: _._id } }">
                <i class="material-icons">edit</i>
              </router-link>
              <a class="btn waves-effect waves-light bg-error" href @click.prevent="deleteProspect(_._id)">
                <i class="material-icons">delete</i>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      There are no prospects.. Lets add one now <br /><br />
    </div>
  </div>
</template>

<script>
import M from 'materialize-css'
import ProspectsService from '@/services/ProspectsService'

export default {
  name: 'prospects',
  data () {
    return {
      prospects: []
    }
  },
  mounted () {
    this.getProspects()
    // this.$alert_error.fire({
    //   icon: 'error',
    //   html: '<h6 class="white-text bold">Ha ocurrido un error!</h6>' +
    //         '<span class="white-text">Intente realizar de nuevo la operación y si persiste el problema favor de contactar al Soporte Técnico</span>',
    //   confirmButtonText: 'Aceptar'
    // }).then(() => {})
  },
  methods: {
    async getProspects () {
      const response = await ProspectsService.fetchProspects()
      this.prospects = response.data.prospects
    },

    async deleteProspect (id) {
      await ProspectsService.deleteProspect(id)
      this.getProspects()
    },

    empty (data) {
      return ['', null, undefined].includes(data) ? '(Vacío)' : data
    }
  },
  updated () {
    M.TapTarget.init(document.querySelector('.tap-target'), {})
    if (!this.prospects.length) {
      M.TapTarget.getInstance(document.querySelector('.tap-target')).open()
    }
  }
}
</script>
