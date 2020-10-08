import Api from '@/services/Api'

export default {
  fetchProspects () {
    return Api().get('prospects')
  },

  createProspect (params) {
    return Api().post('prospect/create', params)
  },

  updateProspect (params) {
    return Api().put('prospect/update/' + params.id, params)
  },

  getProspect (params) {
    return Api().get('prospect/' + params.id)
  },

  deleteProspect (id) {
    return Api().delete('prospect/delete/' + id)
  }
}
