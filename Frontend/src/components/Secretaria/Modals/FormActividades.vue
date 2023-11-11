<template>
  <!-- Ventana flotante con formulario -->

  <div
    v-if="visible && dataLoaded"
    class="fixed top-0 left-0 flex justify-center items-center h-screen w-screen z-50"
  >
    <button
      class="absolute inset-0 w-screen h-screen bg-black opacity-50 cursor-default"
      @click="closeModal"
    ></button>

    <div
      class="relative bg-white rounded-xl w-2/4 shadow-xl max-h-screen overflow-y-auto"
    >
      <div
        class="modal-header bg-green-500 flex justify-between items-center rounded-tl-lg rounded-tr-lg"
      >
        <h2 class="text-lg text-white font-bold py-3 px-4">{{ modalTitle }}</h2>
        <button @click="closeModal" class="mx-4">
          <span class="text-white font-bold text-lg">x</span>
        </button>
      </div>

      <div class="modal-body p-4 max-h-96 overflow-y-auto">
        <form class="w-full" @submit.prevent="submitForm">
          <input type="hidden" id="idSecretaria" v-model="form.idSecretaria" />
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="nombre"
              >
                Docente:
              </label>
              <vue-multiselect
                id="materia"
                v-model="form.rfc"
                :options="users"
                :multiple="false"
                label="nameUser"
                track-by="rfc"
                :searchable="true"
                :loading="isLoading"
                :clear-on-select="true"
                :append-to-body="true"
              ></vue-multiselect>
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/3 px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="fecha"
              >
                Nivel de Estudio:
              </label>
              <vue-multiselect
                id="prog_academico"
                v-model="form.nivelEstudio"
                :options="options"
                :multiple="false"
                label="nivelEstudio"
                track-by="nivelEstudio"
                :clear-on-select="true"
                :append-to-body="true"
                :max-height="120"
              ></vue-multiselect>
            </div>
            <div class="w-full md:w-1/3 px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="nombreInstitucion"
              >
                Institución:
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="nombreInstitucion"
                v-model="form.nombreInstitucion"
                type="text"
                placeholder="Ej. Universidad Autónoma de Chiapas"
              />
            </div>
            <div class="w-full md:w-1/3 px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="areaEspecializacion"
              >
                Area de Especialidad:
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="areaEspecializacion"
                v-model="form.areaEspecializacion"
                type="text"
                placeholder="Ej. Ingeniería de Sistemas"
              />
            </div>
          </div>
          <button
            type="submit"
            class="w-full bg-primaryBlue text-white p-2 rounded hover:bg-blue-900"
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
  </div>
</template>

<script>
import apiEnsenanza from "../../../services/apiEnsenanza";
import VueMultiselect from "vue-multiselect";
import Swal from "sweetalert2";

export default {
  props: ["visible", "id_act"],
  components: { VueMultiselect },
  data() {
    return {
      form: {
        idSecretaria: "",
        rfc: "",
        nivelEstudio: "",
        nombreInstitucion: "",
        areaEspecializacion: "",
      },
      modalTitle: "Registrar",
      dataLoaded: false,
      selected: null,
      options: [
        { id: "1", nivelEstudio: "Primaria" },
        { id: "2", nivelEstudio: "Secundaria" },
        { id: "3", nivelEstudio: "Preparatoria" },
        { id: "4", nivelEstudio: "TSU" },
        { id: "5", nivelEstudio: "Licenciatura" },
        { id: "6", nivelEstudio: "Título Profesional" },
        { id: "7", nivelEstudio: "Especialidad" },
        { id: "8", nivelEstudio: "Maestría" },
        { id: "9", nivelEstudio: "Doctorado" },
        { id: "10", nivelEstudio: "Diplomado" },
        { id: "11", nivelEstudio: "Curso de Actualización" },
        { id: "12", nivelEstudio: "Certificación Profesional" },
      ],

      users: [],
      isLoading: false,
    };
  },
  watch: {
    // Este watcher se mantendrá para reaccionar a cambios de `visible`
    async visible(newVal) {
      if (newVal) {
        if (this.id_act) {
          (this.modalTitle = "Editar"), await this.loadActivityData();
        } else {
          this.modalTitle = "Registrar";
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
    buscarUsuarios() {
      if (!this.users.length) {
        this.isLoading = true;
        // Solo realiza la búsqueda si las opciones están vacías
        apiEnsenanza
          .getUsuarios()
          .then((res) => {
            this.users = res.data.map((user) => ({
              ...user,
              nameUser: `${user.rfc} - ${user.nombre_Doce} ${user.apellido_paterno} - ${user.n_plaza}`,
            }));
            this.isLoading = false;
          })
          .catch((err) => {
            console.log("Error al buscar opciones", err);
            this.isLoading = false;
          });
      }
    },
    async loadActivityData() {
      this.loading = true;
      try {
        const response = await apiTutorias.buscarActividad(this.id_act);

        const fecha = new Date(response.data[0].fechaActTutorias);
        const formattedDate = `${fecha.getFullYear()}-${(fecha.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${fecha.getDate().toString().padStart(2, "0")}`;

        this.form.id_act = response.data[0].idActTutorias;
        this.form.nombre = response.data[0].nombreActTutorias;
        this.form.fecha = formattedDate;
        this.form.descripcion = response.data[0].descripcionActTutorias;

        const prog_academico = response.data[0].prog_academico;
        this.form.prog_academico = this.options.find(
          (option) => option.idprog_academicos === prog_academico
        );

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
      const data = {
        idActTutorias: this.form.id_act,
        nombreActTutorias: this.form.nombre,
        descripcionActTutorias: this.form.descripcion,
        fechaActTutorias: this.form.fecha,
        prog_academico: this.form.prog_academico.idprog_academicos,
      };

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
          .insertarActividad(data) // Envía el FormData con el archivo
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
          .editarActividad(this.form.id_act, data) // Envía el FormData con el archivo
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
  mounted() {
    this.buscarUsuarios();
  },
};
</script>
