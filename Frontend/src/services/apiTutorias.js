// services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Cambia esto según la URL de tu backend

export default {
  obtenerActividades() {
    return axios.get(`${API_URL}/api/tutorias`);
  },

  buscarActividad(id) {
    return axios.get(`${API_URL}/api/buscartutorias/${id}`);
  },

  insertarActividad(data) {
    return axios.post(`${API_URL}/api/tutorias`, data);
  },

  editarActividad(id, data) {
    return axios.put(`${API_URL}/api/tutorias/${id}`, data);
  },

  eliminarActividad(id) {
    return axios.delete(`${API_URL}/api/tutorias/${id}`);
  }
  // Agrega más funciones para otras peticiones si es necesario
};