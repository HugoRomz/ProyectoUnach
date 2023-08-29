// services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Cambia esto según la URL de tu backend

export default {
  obtenerActividades() {
    return axios.get(`${API_URL}/api/tutorias`);
  },

  insertarActividad(data) {
    return axios.post(`${API_URL}/api/tutorias`, data);
}
  // Agrega más funciones para otras peticiones si es necesario
};