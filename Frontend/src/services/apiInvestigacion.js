import axios from "axios";

const API_URL = "http://localhost:3000";

export default {
  insertarProyecto(data) {
    return axios.post(`${API_URL}/investigacion/proyectos_investigacion`, data);
  },

  obtenerProyectos() {
    return axios.get(`${API_URL}/investigacion/proyectos_investigacion`);
  },

  obtenerColaboradores(idColaborador) {
    return axios.get(`${API_URL}/investigacion/colaboradores/${idColaborador}`);
  },

  insertarColaborador(data) {
    return axios.post(`${API_URL}/investigacion/colaboradores`, data);
  },
};
