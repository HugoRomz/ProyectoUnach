import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Cambia esto según la URL de tu backend

export default {
  obtenerActividades(tipoActividad) {
    return axios.get(`${API_URL}/ensenanza/showall/${tipoActividad}`);
  },
  buscarTipoActividad() {
    return axios.get(`${API_URL}/ensenanza/buscarTipoActividad`);
  },

  insertarActividad(formData) {
    return axios.post(`${API_URL}/ensenanza/insertarActividad`, formData);
  }

  // Agrega más funciones para otras peticiones si es necesario
};