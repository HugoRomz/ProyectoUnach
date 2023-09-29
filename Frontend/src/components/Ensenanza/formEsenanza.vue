<template>
  <div class="m-4">
    <button
      v-if="!mostrarFormulario"
      @click="toggleFormulario"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Insertar
    </button>

    <!-- Div que contiene el formulario -->
    <div v-if="mostrarFormulario" class="bg-white px-4">
      <h2 class="text-lg mb-4 text-center font-semibold">Insertar</h2>
      <form class="w-full" @submit.prevent="submitForm">
        <input type="text" id="idActEnsenanza" v-model="form.idActEnsenanza" />
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
              id="nombreAct"
              v-model="form.nombreAct"
              type="text"
              placeholder="Simposio de tutorías"
            />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="tipoActividad"
            >
              Tipo de Actividad:
            </label>
            <vue-multiselect
              id="tipoActividad"
              v-model="form.tipoAct"
              :options="options"
              :multiple="false"
              label="nombretipoAct"
              track-by="idtipoActividad"
              :searchable="true"
              :loading="isLoading"
              :clear-on-select="true"
              :append-to-body="true"
            ></vue-multiselect>
          </div>
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
              v-model="form.fechaAct"
              type="date"
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
              v-model="form.descripcionAct"
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
        @click="cerrarFormulario"
        class="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 mt-4"
      >
        Cerrar
      </button>
    </div>
  </div>
</template>

<script>
import VueMultiselect from "vue-multiselect";
import apiEnsenanza from "../../services/apiEnsenanza";
import Swal from "sweetalert2";

export default {
  components: { VueMultiselect },
  data() {
    return {
      // Opciones para el multiselect
      options: [],
      selectedOption: null,
      isLoading: false,
      // Para el formulario y la ventana flotante
      mostrarFormulario: false,
      // Para el formulario
      form: {
        idActEnsenanza: "",
        nombreAct: "",
        fechaAct: "",
        descripcionAct: "",
        tipoAct: "",
      },
    };
  },
  methods: {
    buscarOpciones() {
      if (!this.options.length) {
        // Solo realiza la búsqueda si las opciones están vacías
        this.isLoading = true;
        apiEnsenanza
          .buscarTipoActividad()
          .then((res) => {
            this.options = res.data;
            this.isLoading = false;
          })
          .catch((err) => {
            console.log("Error al buscar opciones", err);
            this.isLoading = false;
          });
      }
    },
    toggleFormulario() {
      this.mostrarFormulario = !this.mostrarFormulario;
    },
    cerrarFormulario() {
      this.mostrarFormulario = false;
      this.resetForm();
    },
    resetForm() {
      this.form = {
        idActEnsenanza: "",
        nombreAct: "",
        fechaAct: "",
        descripcionAct: "",
        tipoAct: "",
      };
    },
    submitForm() {
      // Lógica para enviar el formulario
      const data = {
        idActEnsenanza: this.form.idActEnsenanza,
        nombreAct: this.form.nombreAct,
        fecha: this.form.fechaAct,
        descripcionAct: this.form.descripcionAct,
        tipoAct: this.form.tipoAct.idtipoActividad,
      };

      if (
        !this.form.nombreAct ||
        !this.form.fechaAct ||
        !this.form.descripcionAct ||
        !this.form.tipoAct
      ) {
        Swal.fire({
          title: "Datos incompletos",
          text: "Todos los campos son obligatorios",
          icon: "warning",
        });
        return;
      }

      if (!this.form.idActEnsenanza) {
        apiEnsenanza
          .insertarActividad(data)
          .then((res) => {
            Swal.fire({
              title: "Actividad insertada",
              text: "La actividad se ha insertado correctamente",
              icon: "success",
            });
            this.resetForm();
            this.cerrarFormulario();
          })
          .catch((err) => {
            Swal.fire({
              title: "Error",
              text: "Hubo un error al insertar la actividad",
              icon: "error",
            });
          });
      } else {
        // apiEnsenanza
        //   .actualizarActividad(formData)
        //   .then((res) => {
        //     Swal.fire({
        //       title: "Actividad actualizada",
        //       text: "La actividad se ha actualizado correctamente",
        //       icon: "success",
        //     });
        //     this.resetForm();
        //   })
        //   .catch((err) => {
        //     console.log("Error al actualizar actividad", err);
        //     Swal.fire({
        //       title: "Error",
        //       text: "Hubo un error al actualizar la actividad",
        //       icon: "error",
        //     });
        //   });
        console.log("Actualizar");
      }
    },
  },
  mounted() {
    this.buscarOpciones();
  },
};
</script>
<style>
/* Importa los estilos de vue-multiselect */
@import "vue-multiselect/dist/vue-multiselect.css";
</style>
