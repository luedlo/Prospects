import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: '/',
    timeout: 20000,
    name: 'API 1.0',
    timeoutErrorMessage: 'Se ha agotado el tiempo de respuesta!'
  })
}
