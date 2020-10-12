import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: 'http://0.0.0.0:8081',
    timeout: 10000,
    name: 'API 1.0',
    timeoutErrorMessage: 'Se ha agotado el tiempo de respuesta!'
  })
}
