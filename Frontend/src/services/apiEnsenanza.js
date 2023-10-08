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
  },
  actualizarActividad(id, formData) {

    return axios.put(`${API_URL}/ensenanza/editarActividad/${id}`, formData);
  },
  eliminarActividad(id) {
    return axios.delete(`${API_URL}/ensenanza/eliminarActividad/${id}`);
  },
  obtenerEvidencias(idEvidencia){
    return axios.get(`${API_URL}/ensenanza/evidencias/${idEvidencia}`);
  },
  insertarEvidencias(formData) {
    return axios.post(`${API_URL}/ensenanza/insertarEvidencias`, formData);
  },

};