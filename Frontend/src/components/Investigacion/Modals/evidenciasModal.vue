<template>
  <div
    v-if="show"
    class="fixed top-0 left-0 flex justify-center items-center h-screen w-screen"
  >
    <button
      class="absolute inset-0 w-screen h-screen bg-black opacity-50 cursor-default"
      @click="$emit('close')"
    ></button>
    <div
      class="relative bg-white rounded-xl w-2/4 shadow-xl max-h-screen overflow-y-auto"
    >
      <div
        class="modal-header bg-blue-500 flex justify-between items-center rounded-tl-lg rounded-tr-lg"
      >
        <h1 class="text-white font-bold py-3 px-4"></h1>
        <button @click="$emit('close')" class="mx-4">
          <span class="text-white font-bold text-lg">x</span>
        </button>
      </div>
      <div
      class="relative bg-white rounded-xl w-3/4 shadow-xl max-h-4/5-screen overflow-y-auto"
    >
    </div>
      <div class="modal-body p-4 overflow-y-auto">
        <div class="w-full p-6 shadow-lg rounded-md border border-gray-300">
          <form class="w-full" @submit.prevent="submitForm">
            <input type="text" v-model="form.idColaborador" />
            <input type="text" v-model="form.idProyecto" />

            <!-- Nombre del colaborador -->
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="nombreColaborador"
                >
                  Nombre del Colaborador:
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="nombreColaborador"
                  v-model="form.nombreColaborador"
                  type="text"
                  placeholder="Nombre completo del colaborador"
                />
              </div>
            </div>

            <!-- Tipo de colaborador -->
            <div class="mb-6">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="nombreColaborador"
              >
                Tipo de Colaborador:
              </label>
              <select
                id="tipoColaborador"
                v-model="form.tipoColaborador"
                class="w-full p-2 rounded border focus:border-blue-400"
              >
                <option value="Docente">Docente</option>
                <option value="Alumno">Alumno</option>
              </select>
            </div>

            <button
              type="submit"
              class="w-full bg-blue-800 text-white p-2 rounded hover:bg-blue-900"
            >
              Guardar
            </button>
          </form>
        </div>

        <div
          class="w-full mt-4 p-2 shadow-xl rounded-md border border-gray-300"
        >
          <DataTableComponent :data="colaboradores" :columns="columns">
            <template #headers>
              <th>ID</th>
              <th>Nombre del Colaborador</th>
              <th>Tipo de Colaborador</th>
              <th>Acciones</th>
            </template>
          </DataTableComponent>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import DataTableComponent from '../../Plantillas/DataTableComponent.vue';
import apiInvestigacion from '../../../services/apiInvestigacion';
import Swal from 'sweetalert2';

export default {
  components: {
    DataTableComponent,
  },

  props: {
    show: {
      type: Boolean,
      default: false,
    },
    projectId: {
      type: [Number, String],
      default: "",
    },
  },

  data(){
    return {
      colaboradores: [],

      form: {
        idColaborador: "",
        idProyecto: "",
        nombreColaborador: ""
      },

      columns: [
        { data: "idColaborador" },
        { data: "nombre" },
        { data: "tipo" },
        {
          title: "Acciones",
          data: null,
          render: (data, type, row) => {
            return `
                        <button class="btn-editar-actividad bg-yellow-500 text-white p-2 pt-2 rounded" data-id="${data.idEvidenciasT}"><i class="pi pi-pencil pointer-events-none"></i></button>
                        <button class="btn-eliminar-actividad bg-red-500 text-white  p-2 pt-2  rounded" data-id="${data.idEvidenciasT}"><i class="pi pi-trash pointer-events-none"></i></button>
                      `;
          },
        },
      ],
    }
  },
  watch: {
    show(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          //this.obtenerData();
          this.form.idProyecto = this.projectId;
        });
      }
    },
  },
  methods: {

  }
}

</script>
