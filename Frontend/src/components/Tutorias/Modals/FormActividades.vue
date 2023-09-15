<template>
  <!-- Ventana flotante con formulario -->
  <div
    v-if="visible"
    class="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center"
  >
    <div class="bg-white p-8 rounded-lg w-1/2">
      <h2 class="text-lg mb-4 text-center font-semibold">Insertar</h2>
      <form @submit.prevent="submitForm" class="space-y-4">
        <div class="flex flex-col">
          <input type="hidden" id="id_act" v-model="form.id_act" />
          <label for="nombre" class="text-sm font-semibold">Nombre:</label>
          <input
            type="text"
            id="nombre"
            v-model="form.nombre"
            class="p-2 rounded border focus:border-blue-400"
          />
        </div>
        <div class="flex flex-col">
          <label for="fecha" class="text-sm font-semibold">Fecha:</label>
          <input
            type="date"
            id="fecha"
            v-model="form.fecha"
            class="p-2 rounded border focus:border-blue-400"
          />
        </div>
        <div class="flex flex-col">
          <label for="descripcion" class="text-sm font-semibold"
            >Descripción:</label
          >
          <textarea
            id="descripcion"
            v-model="form.descripcion"
            rows="4"
            class="p-2 rounded border focus:border-blue-400"
          ></textarea>
        </div>
        <div class="flex flex-col">
          <label for="prog_academico" class="text-sm font-semibold"
            >Programa Académico:</label
          >
          <select
            id="prog_academico"
            v-model="form.prog_academico"
            class="p-2 rounded border focus:border-blue-400"
          >
            <option disabled value="">Por favor seleccione una opción</option>
            <option>LIDTS</option>
            <option>LC</option>
            <option>Ambas</option>
          </select>
        </div>

        <div class="flex flex-col">
          <label for="evidencias" class="text-sm font-semibold mb-2"
            >Evidencias:</label
          >
          <input
            type="file"
            id="evidencias"
            multiple
            @change="handleFileUpload($event)"
            class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600 border rounded"
          />
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
import Swal from "sweetalert2";

export default {
  props: ["visible", "id_act"],
  data() {
    return {
      // Para el formulario y la ventana flotante
      form: {
        id_act: "",
        nombre: "",
        fecha: "",
        descripcion: "",
        prog_academico: "",
        evidencias: null,
      },
    };
  },
  watch: {
    // Este watcher se mantendrá para reaccionar a cambios de `visible`
    async visible(newVal) {
      if (newVal && this.id_act) {
        this.loadActivityData();
      }
    },
  },
  methods: {
    handleFileUpload(event) {
      this.form.evidencias = event.target.files;
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
        this.form.id_act = response.data[0].id_act;
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
      // Verifica si los campos del formulario están vacíos
      if (
        !this.form.nombre ||
        !this.form.fecha ||
        !this.form.descripcion ||
        !this.form.prog_academico
      ) {
        Swal.fire({
          title: "Datos incompletos",
          text: "Porfavor rellena todos los campos",
          icon: "warning",
        });
        return;
      }

      if (this.form.id_act === null || this.form.id_act === "") {
        apiTutorias
          .insertarActividad(this.form)
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

        apiTutorias.editarActividad(this.form.id_act , this.form)
        .then(response => {
            Swal.fire({
                title: 'Actividad editada',
                text: 'La actividad se ha editado exitosamente',
                icon: 'success',
            });
             this.closeModal();
            this.$emit("activityChanged");
        })
        .catch(error => {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un error editando la actividad',
                icon: 'error',
            });
        });
      }
    },
  },
};
</script>
