<template>
  <!-- Ventana flotante con formulario -->

  <div
    v-if="visible && dataLoaded"
    class="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center"
  >
    <div class="bg-white p-8 rounded-lg w-1/2">
      <h2 class="text-lg mb-4 text-center font-semibold">{{ modalTitle }}</h2>
      <form class="w-full" @submit.prevent="submitForm">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="nombre"
            >
              Nombre de la actividad:
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="nombre"
              v-model="form.nombre"
              type="text"
              placeholder="Simposio de tutorías"
            />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="fecha"
            >
              Fecha:
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="fecha"
              v-model="form.fecha"
              type="date"
            />
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="programa_academico"
            >
              Programa académico:
            </label>
            <VueMultiselect
              id="programa_academico"
              v-model="form.prog_academico"
              :options="options"
              placeholder="Elige un programa..."
              label="name"
              track-by="name"
            >
            </VueMultiselect>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="evidencias"
            >
              Evidencias:
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
              id="evidencias"
              name="evidencias"
              type="file"
              placeholder="Simposio de tutorías"
              ref="evidenciasInput"
              @change="handleFileUpload"
            />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="descripcion"
            >
              Descripcion de la actividad:
            </label>
            <textarea
              id="descripcion"
              v-model="form.descripcion"
              rows="4"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            ></textarea>
          </div>
        </div>
        <button
          type="submit"
          class="w-full bg-blue-800 text-white p-2 rounded hover:bg-blue-900"
        >
          Guardar
        </button>
      </form>
      <button
        @click="closeModal"
        class="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 mt-4"
      >
        Cerrar
      </button>
    </div>
  </div>
</template>

<script>
import apiTutorias from "../../../services/apiTutorias";
import VueMultiselect from "vue-multiselect";
import Swal from "sweetalert2";

export default {
  props: ["visible", "id_act"],
  components: { VueMultiselect },
  data() {
    return {
      // Para el formulario y la ventana flotante
      form: {
        id_act: "",
        nombre: "",
        fecha: "",
        descripcion: "",
        prog_academico: "",
      },
      archivo: null,
      modalTitle: "Insertar",
      dataLoaded: false,
      selected: null,
      options: [{ name: "LIDTS" }, { name: "LC" }, { name: "AMBAS" }],
    };
  },
  watch: {
    // Este watcher se mantendrá para reaccionar a cambios de `visible`
    async visible(newVal) {
      if (newVal) {
        if (this.id_act) {
          (this.modalTitle = "Editar"), await this.loadActivityData();
        } else {
          this.modalTitle = "Insertar";
          this.dataLoaded = true;
          this.resetForm();
        }
      } else {
        this.dataLoaded = false;
        this.resetForm();
      }
    },
  },
  methods: {
    handleFileUpload() {
      this.archivo = this.$refs.evidenciasInput.files[0];
    },
    async loadActivityData() {
      this.loading = true;
      try {
        const response = await apiTutorias.buscarActividad(this.id_act);

        const fecha = new Date(response.data[0].fecha);
        const formattedDate = `${fecha.getFullYear()}-${(fecha.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${fecha.getDate().toString().padStart(2, "0")}`;

        this.form.id_act = response.data[0].id_act;
        this.form.nombre = response.data[0].nombre;
        this.form.fecha = formattedDate;
        this.form.descripcion = response.data[0].descripcion;
        this.form.prog_academico = response.data[0].prog_academico;

        const prog_academico = response.data[0].prog_academico;
        this.form.prog_academico = this.options.find(
          (option) => option.name === prog_academico
        );

        this.form.id_act = response.data[0].id_act;
        this.dataLoaded = true;
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Hubo un error obteniendo los datos de la actividad",
          icon: "error",
        });
      } finally {
        this.loading = false;
      }
    },
    closeModal() {
      this.$emit("update:visible", false);
      this.dataLoaded = false;
      this.resetForm();
    },
    resetForm() {
      this.form = {
        id_act: "",
        nombre: "",
        fecha: "",
        descripcion: "",
        prog_academico: "",
        evidencias: null,
      };
    },

    // Función para manejar el envío del formulario
    submitForm() {
      // Crea un objeto FormData para enviar datos de formulario incluyendo el archivo
      const formData = new FormData();
      formData.append("nombre", this.form.nombre);
      formData.append("fecha", this.form.fecha);
      formData.append("descripcion", this.form.descripcion);
      formData.append("prog_academico", this.form.prog_academico.name);
      formData.append("evidencias", this.archivo); // Agrega el archivo al FormData

      // Verifica si los campos del formulario están vacíos
      if (
        !this.form.nombre ||
        !this.form.fecha ||
        !this.form.descripcion ||
        !this.form.prog_academico 
      ) {
        Swal.fire({
          title: "Datos incompletos",
          text: "Por favor rellena todos los campos",
          icon: "warning",
        });
        return;
      }

      if (this.form.id_act === null || this.form.id_act === "") {
        apiTutorias
          .insertarActividad(formData) // Envía el FormData con el archivo
          .then((response) => {
            Swal.fire({
              title: "Actividad registrada",
              text: "La actividad se ha registrado exitosamente",
              icon: "success",
            });
            //   this.obtenerActividades(); // Actualiza la lista de actividades
            this.closeModal();
            this.$emit("activityChanged");
          })
          .catch((error) => {
            Swal.fire({
              title: "Error",
              text: "Hubo un error enviando el formulario",
              icon: "error",
            });
          });
      } else if (this.form.id_act != null || this.form.id_act != "") {
        apiTutorias
          .editarActividad(this.form.id_act, formData) // Envía el FormData con el archivo
          .then((response) => {
            Swal.fire({
              title: "Actividad editada",
              text: "La actividad se ha editado exitosamente",
              icon: "success",
            });
            this.closeModal();
            this.$emit("activityChanged");
          })
          .catch((error) => {
            Swal.fire({
              title: "Error",
              text: "Hubo un error editando la actividad",
              icon: "error",
            });
          });
      }
    },
  },
};
</script>
