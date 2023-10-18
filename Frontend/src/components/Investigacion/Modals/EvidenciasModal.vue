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
        <h1 class="text-white font-bold py-3 px-4">Evidencias</h1>
        <button @click="$emit('close')" class="mx-4">
          <span class="text-white font-bold text-lg">x</span>
        </button>
      </div>
      <div
        class="relative bg-white rounded-xl w-3/4 shadow-xl max-h-4/5-screen overflow-y-auto"
      ></div>
      <div class="modal-body p-4 overflow-y-auto">
        <h1
          class="text-xl mt-3 mb-5 font-bold text-center py-4 bg-slate-500 text-white rounded"
        >
          Añadir una Evidencia
        </h1>
        <div class="w-full p-6 shadow-lg rounded-md border border-gray-300">
          <form class="w-full" @submit.prevent="submitForm">
            <input type="hidden" v-model="form.idEvidencia" />
            <input type="hidden" v-model="form.idProyecto" />

            <!-- Nombre de la evidencia -->
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="nombreEvidencia"
                >
                  Nombre:
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="nombreEvidencia"
                  v-model="form.nombreEvidencia"
                  type="text"
                  placeholder="Nombre de la evidencia"
                />
              </div>
            </div>

            <!-- Evidencia -->
            <div class="w-full px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="evidencias"
              >
                Evidencia:
              </label>
            </div>

            <div class="h-96 flex justify-center items-center bg-gray-200">
              <div
                class="bg-white p-5 rounded-xl shadow-lg space-y-4 flex flex-col items-center justify-center"
              >
                <div
                  @click="openFilePicker"
                  class="border-2 border-dashed border-SecundaryGold p-10 rounded-xl text-center cursor-pointer hover:bg-yellow-100"
                >
                  <span
                    class="material-icons-outlined text-4xl text-SecundaryGold"
                    ><i class="pi pi-upload pointer-events-none"></i
                  ></span>
                  <h3 class="text-xl mt-4">Drag & drop any file here</h3>
                  <p class="mt-2 text-SecundaryGold cursor-pointer">
                    or browse file from device
                  </p>
                </div>
                <div
                  v-if="showErrorMessage"
                  class="flex items-center space-x-4 bg-yellow-200 text-red-700 p-3 rounded"
                >
                  <span class="material-icons-outlined">error</span>
                  <span>Please select a file first</span>
                  <span
                    @click="showErrorMessage = false"
                    class="material-icons-outlined cursor-pointer"
                    >cancel</span
                  >
                </div>
                <div
                  v-if="file"
                  class="flex justify-between items-center border border-SecundaryGold p-3 rounded-xl text-primaryBlue w-full"
                >
                  <div class="flex items-center">
                    <span class="material-icons-outlined mr-3 text-black"
                      >Descripción:</span
                    >
                    <span>{{ file.name }} | {{ fileSize }} | </span>
                  </div>
                  <span @click="removeFile"
                    ><i
                      class="pi pi-trash text-red-700 mx-1 cursor-pointer"
                    ></i>
                  </span>
                </div>
              </div>
              <input
                style="display: none"
                id="evidencias"
                name="evidencias"
                type="file"
                ref="fileInput"
                @change="handleFileChange"
              />
            </div>

            <button
              type="submit"
              class="w-full mt-5 bg-blue-800 text-white p-2 rounded hover:bg-blue-900"
            >
              Guardar
            </button>
          </form>
        </div>
        <h1
          class="text-xl mt-5 font-bold text-center py-4 bg-slate-500 text-white rounded"
        >
          Lista de Evidencias
        </h1>
        <div
          class="w-full mt-4 p-2 shadow-xl rounded-md border border-gray-300"
        >
          <DataTableComponent :data="evidencias" :columns="columns">
            <template #headers>
              <th>ID</th>
              <th>Nombre de la evidencia</th>
              <th>Acciones</th>
            </template>
          </DataTableComponent>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataTableComponent from "../../Plantillas/DataTableComponent.vue";
import apiInvestigacion from "../../../services/apiInvestigacion";
import Swal from "sweetalert2";

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
  data() {
    return {
      file: null,
      showErrorMessage: false,
      evidencias: [],
      form: {
        idEvidencia: "",
        idProyecto: "",
        nombreEvidencia: "",
      },
      archivo: null,
      columns: [
        { data: "id_evidencia" },
        { data: "nombre" },
        {
          title: "Acciones",
          data: null,
          render: (data, type, row) => {
            return `
                        <button class="btn-editar-evidencia bg-yellow-500 text-white p-2 pt-2 rounded" data-id="${data.id_evidencia}"><i class="pi pi-pencil pointer-events-none"></i></button>
                        <button class="btn-eliminar-evidencia bg-red-500 text-white  p-2 pt-2  rounded" data-id="${data.id_evidencia}"><i class="pi pi-trash pointer-events-none"></i></button>
                      `;
          },
        },
      ],
    };
  },
  computed: {
    fileSize() {
      return this.file ? (this.file.size / 1024).toFixed(1) + " KB" : "";
    },
  },
  watch: {},

  mounted() {},

  methods: {
    openFilePicker() {
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      const files = event.target.files;
      if (files.length > 0) {
        this.file = files[0];
        this.showErrorMessage = false;
      }
    },
    uploadFile() {
      if (this.file) {
        // Handle the upload logic here
        console.log("Uploading file:", this.file.name);
      } else {
        this.showErrorMessage = true;
      }
    },
    removeFile() {
      this.file = null;
    },
    resetForm() {
      this.form = {
        ...this.form,
        idEvidencia: "",
        nombreEvidencia: "",
      };
      this.archivo = null;
    },
    submitForm() {},
  },
};
</script>
