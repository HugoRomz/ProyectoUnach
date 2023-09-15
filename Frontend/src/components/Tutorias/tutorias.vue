<template>
  <div class="container mx-auto">
    <div
      class="mt-8 flex flex-wrap space-x-0 space-y-2 md:space-x-4 md:space-y-0"
    >
      <div class="flex-1 bg-white p-4 shadow-xl border rounded-lg md:w-1/2">
        <button
          @click="openModal"
          class="bg-blue-500 text-white p-2 rounded mt-4 mb-4"
        >
          Registrar Actividad
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../services/apiTutorias";

export default {
  components: { DataTable, HeaderComponent },
  data() {
    return {
      // Para el formulario y la ventana flotante
      form: {
        nombre: "",
        fecha: "",
        descripcion: "",
        prog_academico: "",
        evidencias: null,
      },
      showModal: false, // Controla si se muestra o no la ventana flotante
      modalTitle: "",
      formMode: "", // Puede ser 'insertar' o 'editar'
      editingId: null, // ID del elemento que se está editando
    };
  },
  mounted() {
    this.$nextTick(() => {
      document.addEventListener("click", (event) => {
        // Verificar si se hizo clic en el botón de editar
        if (event.target.matches(".btn-editar-actividad")) {
          const id = event.target.getAttribute("data-id");
          this.cargarActividadParaEditar(id);
        }

        // Verificar si se hizo clic en el botón de eliminar
        if (event.target.matches(".btn-eliminar-actividad")) {
          const id = event.target.getAttribute("data-id");
          this.eliminarActividad(id);
        }
      });
    });
  },
  methods: {
    cargarActividadParaEditar(id) {
      const actividad = this.actividades.find((act) => act.id_act == id);

      // Convertir la fecha al formato YYYY-MM-DD
      const fecha = new Date(actividad.fecha);
      const formattedDate = `${fecha.getFullYear()}-${(fecha.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${fecha.getDate().toString().padStart(2, "0")}`;

      if (actividad) {
        this.form.nombre = actividad.nombre;
        this.form.fecha = formattedDate;
        this.form.descripcion = actividad.descripcion;
        this.form.prog_academico = actividad.prog_academico;
        // Para evidencias, debes decidir cómo tratarlas. Por ahora, la dejaremos como null.
        this.form.evidencias = null;

        this.showModal = true;
        this.modalTitle = "Editar Actividad";
        this.formMode = "editar"; // Establece el modo a editar
        this.editingId = id; // Guarda el ID que se está editando
      } else {
        console.error("No se encontró la actividad con el ID:", id);
      }
    },

    handleFileUpload(event) {
      this.form.evidencias = event.target.files;
    },
    // Nuevas funciones para abrir y cerrar la ventana flotante
    openModal() {
      this.modalTitle = "Registrar Actividad";
      this.resetForm(); // Aquí restableces el formulario
      this.formMode = "insertar"; // Establece el modo a insertar
      this.showModal = true;
    },
    eliminarActividad(id) {
      if (confirm("¿Estás seguro de que deseas eliminar esta actividad?")) {
        api
          .eliminarActividad(id)
          .then((response) => {
            console.log("Actividad eliminada exitosamente", response);
            this.obtenerActividades(); // Actualiza la lista de actividades
          })
          .catch((error) => {
            console.error("Hubo un error eliminando la actividad", error);
          });
      }
    },
    closeModal() {
      this.showModal = false;
    },
    resetForm() {
      this.form = {
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
        alert("Todos los campos son obligatorios");
        return;
      }

      if (this.formMode === "insertar") {
        api
          .insertarActividad(this.form)
          .then((response) => {
            console.log("Formulario enviado exitosamente", response);
            this.obtenerActividades(); // Actualiza la lista de actividades
            this.showModal = false;
          })
          .catch((error) => {
            console.error("Hubo un error enviando el formulario", error);
          });
      } else if (this.formMode === "editar") {
        api
          .editarActividad(this.editingId, this.form)
          .then((response) => {
            console.log("Actividad editada exitosamente", response);
            this.obtenerActividades();
            this.showModal = false;
          })
          .catch((error) => {
            console.error("Hubo un error editando la actividad", error);
          });
      }
    },
  },
};
</script>
