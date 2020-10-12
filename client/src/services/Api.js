import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: 'http://localhost:8081',
    timeout: 10000,
    name: 'API 1.0',
    timeoutErrorMessage: 'Se ha agotado el tiempo de respuesta!'
  })
}
