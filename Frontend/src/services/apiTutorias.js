// services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Cambia esto según la URL de tu backend

export default {
  obtenerActividades() {
    return axios.get(`${API_URL}/tutorias/tutorias`);
  },
  buscarProgAcademico() {
    return axios.get(`${API_URL}/tutorias/buscarProgAcademico`);
  },

  buscarActividad(id) {
    return axios.get(`${API_URL}/tutorias/buscartutorias/${id}`);
  },

  insertarActividad(data) {
    return axios.post(`${API_URL}/tutorias/tutorias`, data);
  },

  editarActividad(id, data) {
    return axios.put(`${API_URL}/tutorias/tutorias/${id}`, data);
  },

  eliminarActividad(id) {
    return axios.delete(`${API_URL}/tutorias/eliminarEvidencias/${id}`);
  },
  // Agrega más funciones para otras peticiones si es necesario

  obtenerEvidencias(idEvidencia){
    return axios.get(`${API_URL}/tutorias/evidencias/${idEvidencia}`);
  },
  insertarEvidencias(formData) {
    return axios.post(`${API_URL}/tutorias/insertarEvidencias`, formData);
  },
  eliminarEvidencia(id) {
    return axios.delete(`${API_URL}/tutorias/eliminarEvidencias/${id}`);
  },
  actualizarEvidencias(id, formData) {
    return axios.put(
      `${API_URL}/tutorias/actualizarEvidencias/${id}`,
      formData
    );
  },
};