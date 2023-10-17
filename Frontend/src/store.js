import { createStore } from 'vuex'

const store = createStore({
    state: {
        sideBarOpen: false,
        actualizarTabla: false,
        actividadEditar: null
    },
    getters: {
        sideBarOpen: state => state.sideBarOpen,
        // puedes agregar más getters si los necesitas
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
        }
    },
    actions: {
        toggleSidebar({ commit }) {
            commit('toggleSidebar');
        },
        cambiarBanderaActualizarTabla({ commit }) {
            commit('CAMBIAR_BANDERA_ACTUALIZAR_TABLA');
        },
        setActividadAEditar({ commit }, actividad) {
            commit('SET_ACTIVIDAD_A_EDITAR', actividad);
        }
        // puedes agregar más acciones si las necesitas
    }
});

export default store;
