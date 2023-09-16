<template>
  <div class="w-full p-4">
    <div class="w-full">
      <DataTableComponent
        :data="actividades"
        :columns="columns"
        :dtoptions="dtoptions"
      >
        <template #headers>
          <th>No_Actividad</th>
          <th>Nombre</th>
          <th>Fecha</th>
          <th>Descripcion</th>
          <th>Programa Academico</th>
          <th>Acciones</th>
        </template>
      </DataTableComponent>
    </div>
  </div>
  <ModalFormComponent
    :visible="showModal"
    :id_act="editingId"
    @update:visible="closeModal"
    @activityChanged="obtenerActividades"
  />
</template>

<script>
import api from "../../services/apiTutorias";
import DataTableComponent from "../Plantillas/DataTableComponent.vue"; // Asegúrate de ajustar la ruta
import Swal from "sweetalert2";
import ModalFormComponent from "../Tutorias/Modals/FormActividades.vue";

export default {
  components: {
    DataTableComponent,
    ModalFormComponent, // Cambiado a nuestro componente personalizado
  },
  data() {
    return {
      actividades: [],
      columns: [
        { data: "id_act" },
        { data: "nombre" },
        {
          data: "fecha",
          render: function (data, type, row) {
            if (type === "display" || type === "filter") {
              var fecha = new Date(data);
              var dia = fecha.getDate();
              var mes = fecha.getMonth() + 1;
              var año = fecha.getFullYear();
              return `${año}-${mes < 10 ? "0" + mes : mes}-${
                dia < 10 ? "0" + dia : dia
              }`;
            }
            return data; // para otros tipos de datos, devuelves el valor original
          },
        },
        { data: "descripcion" },
        { data: "prog_academico" },
        {
          title: "Acciones",
          data: null,
          render: (data, type, row) => {
            return `
                        <button class="btn-editar-actividad bg-yellow-500 text-white p-2 pt-3 rounded" data-id="${data.id_act}"><i class="pi pi-pencil pointer-events-none"></i></button>
                        <button class="btn-eliminar-actividad bg-red-500 text-white  p-2 pt-3  rounded" data-id="${data.id_act}"><i class="pi pi-trash pointer-events-none"></i></button>
                        <button class="bg-blue-500 text-white  p-2 pt-3  rounded" @click="detalleActividad(${data.id})"><i class="pi pi-info-circle pointer-events-none"></i></button>
                      `;
          },
        },
      ],
      dtoptions: {
        dom: "Bfrtip",
        language: {
          search: "Buscar",
          zeroRecords: "No hay registros para mostrar",
          info: "Mostrando del _START_ al _END_ de _TOTAL_ registros",
          infoFiltered: "(Filtrados de _MAX_ registros)",
          paginate: {
            first: "Primero",
            previous: "Anterior",
            next: "Siguiente",
            last: "Ultimo",
          },
        },
        buttons: [
          {
            tittle: "Reporte de actividades PAT",
            extend: "excelHtml5",
            text: "Excel",
            className: "bg-green-500 btn btn-success border-0",
          },
          {
            tittle: "Reporte de actividades PAT",
            extend: "pdfHtml5",
            text: '<i class="fa-regular fa-file"></i> PDF',
            className: "bg-red-500 btn btn-danger border-0",
            customize: function (doc) {
              // Personalizar el documento PDF aquí
            },
          },

          {
            tittle: "Reporte de actividades PAT",
            extend: "print",
            text: "Imprimir",
            className: "bg-gray-500 btn btn-dark border-0",
          },
          {
            tittle: "Reporte de actividades PAT",
            extend: "copy",
            text: "Copiar Texto",
            className: "bg-slate-300 btn btn-light border-0",
          },
        ],
      },
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
    this.obtenerActividades();

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
    obtenerActividades() {
      api
        .obtenerActividades()
        .then((response) => {
          this.actividades = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener las actividades:", error);
        });
    },
    updateData() {
      this.obtenerActividades(); // Esta función ya la tienes definida para obtener las actividades
    },
    eliminarActividad(id) {
      Swal.fire({
        title: "¿Estás seguro de que deseas eliminar esta actividad?",
        text: "Si eliminas esta actividad, no podrás recuperarla.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!",
      }).then((result) => {
        if (result.isConfirmed) {
          api
            .eliminarActividad(id)
            .then((response) => {
              Swal.fire(
                "Eliminado!",
                "El registro fue eliminado correctamente",
                "success"
              );
              this.obtenerActividades();
            })
            .catch((error) => {
              Swal.fire(
                "Error!",
                "Hubo un error eliminando el registro",
                "error"
              );
            });
        }
      });
    },
    cargarActividadParaEditar(id) {
      this.editingId = id; // Asigna el ID a editar
      this.showModal = true;
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