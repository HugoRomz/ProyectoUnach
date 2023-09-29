//crear una store para el manejo de la bandera de actualizar tabla
import { createStore } from 'vuex'

// nueva store para el manejo de la bandera de actualizar tabla
const store = createStore({
    state: {
      actualizarTabla: false
    },
    mutations: {
      CAMBIAR_BANDERA_ACTUALIZAR_TABLA(state) {
        state.actualizarTabla = !state.actualizarTabla;
      }
    },
    actions: {
      cambiarBanderaActualizarTabla({ commit }) {
        commit('CAMBIAR_BANDERA_ACTUALIZAR_TABLA');
      }
    }
  });

  export default store;