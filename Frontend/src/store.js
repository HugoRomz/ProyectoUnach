import { createStore } from "vuex";

const store = createStore({
  state: {
    sideBarOpen: false,
    actualizarTabla: false,
    actividadEditar: null,
    token: null,
    user: {},
    permisos: [],
    selectedMateria: null,
  },
  getters: {
    sideBarOpen: (state) => state.sideBarOpen,
    tienePermiso: (state) => (permiso) => {
      // Si tiene permiso de Super-Admin, puede acceder a todo.
      if (state.permisos.some(p => p.Permiso === "Super-Admin")) {
          return true;
      }
  
      // Si el permiso solicitado es de tipo *-Admin, verifica si el usuario tiene ese permiso específico.
      if (permiso.endsWith('-Admin')) {
          return state.permisos.some(p => p.Permiso === permiso);
      }
  
      // Para otros permisos (no Admin), verifica si el usuario tiene el permiso o el permiso Admin correspondiente.
      return state.permisos.some(p => p.Permiso === permiso || p.Permiso === `${permiso}-Admin`);
  },
    getSelectedMateria: state => state.selectedMateria
  },
  mutations: {
    toggleSidebar(state) {
      state.sideBarOpen = !state.sideBarOpen;
    },
    CAMBIAR_BANDERA_ACTUALIZAR_TABLA(state) {
      state.actualizarTabla = !state.actualizarTabla;
    },
    SET_ACTIVIDAD_A_EDITAR(state, actividad) {
      state.actividadEditar = actividad;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USER(state, userData) {
      state.user = userData;
    },
    SET_PERMISOS(state, permisos) {
      state.permisos = permisos;
    },
    setSelectedMateria(state, materia) {
      state.selectedMateria = materia;
  }
  },
  actions: {
    toggleSidebar({ commit }) {
      commit("toggleSidebar");
    },
    cambiarBanderaActualizarTabla({ commit }) {
      commit("CAMBIAR_BANDERA_ACTUALIZAR_TABLA");
    },
    setActividadAEditar({ commit }, actividad) {
      commit("SET_ACTIVIDAD_A_EDITAR", actividad);
    },
    setToken({ commit }, token) {
      commit("SET_TOKEN", token);
    },
    setUser({ commit }, userData) {
      commit("SET_USER", userData);
    },
    setPermisos({ commit }, response) {
      commit("SET_PERMISOS", response.data.permisos);
    },
  },
});

export default store;
