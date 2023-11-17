// services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Cambia esto según la URL de tu backend

export default {
  obtenerSecretaria() {
    return axios.get(`${API_URL}/secretaria/showAll`);
  },
  insertarDocente(data) {
    return axios.post(`${API_URL}/secretaria/insertarDocente`, data);
  },
 
  editarDocente(id, data) {
    return axios.put(`${API_URL}/secretaria/editarDocente/${id}`, data);
  },

  eliminarDocente(id) {
    return axios.delete(`${API_URL}/secretaria/eliminarDocente/${id}`);
  },


  obtenerDocumentos(id) {
    return axios.get(`${API_URL}/secretaria/documentos/${id}`);
  },


  insertarDocumentos(formData) {
    return axios.post(`${API_URL}/secretaria/insertarDocumentos`, formData);
  },

  eliminarDocumentos(id) {
    return axios.delete(`${API_URL}/secretaria/eliminarDocumentos/${id}`);
  },
  actualizarDocumentos(id, formData) {
    return axios.put(
      `${API_URL}/secretaria/actualizarDocumentos/${id}`,
      formData
    );
  },


  getTipoDoc(){
    return axios.get(`${API_URL}/secretaria/getTipo/`);
  }

};