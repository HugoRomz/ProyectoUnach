// services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Cambia esto según la URL de tu backend

export default {
  obtenerSecretaria() {
    return axios.get(`${API_URL}/secretaria/showAll`);
  },

};