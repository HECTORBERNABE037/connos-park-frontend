import api from './api'

export default {
  getVehiculos() {
    return api.get('/vehiculos/')
  }
  // Aquí podrías agregar createVehiculo si decides agregarlo desde el modal después
}