//crear una store para el manejo de la bandera de actualizar tabla
import { createStore } from 'vuex'

// nueva store para el manejo de la bandera de actualizar tabla
const store = createStore({
    state: {
      actualizarTabla: false,
      actividadEditar: null,
    },
    mutations: {
      CAMBIAR_BANDERA_ACTUALIZAR_TABLA(state) {
        state.actualizarTabla = !state.actualizarTabla;
      },
      SET_ACTIVIDAD_A_EDITAR(state, actividad) { 
        state.actividadAEditar = actividad;
      }
    },
    actions: {
      cambiarBanderaActualizarTabla({ commit }) {
        commit('CAMBIAR_BANDERA_ACTUALIZAR_TABLA');
      },
      setActividadAEditar({commit}, actividad) { // Nueva acción
        commit('SET_ACTIVIDAD_A_EDITAR', actividad);
      }
    }
  });

  export default store;