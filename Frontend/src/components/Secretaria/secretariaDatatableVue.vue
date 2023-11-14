<template>
  <div class="w-full p-4">
    <div class="w-full">
      <DataTableComponent
        :data="secretariaData"
        :columns="columns"
        :dtoptions="dtoptions"
      >
        <template #headers>
          <th>Id</th>
          <th>RFC</th>
          <th>Nivel de Estudio</th>
          <th>Institución</th>
          <th>Area</th>
          <th>Acciones</th>
        </template>
      </DataTableComponent>
    </div>
  </div>
  <ModalFormComponent
    :visible="showModal"
    :data="dataID"
    @update:visible="closeModal"
    @activityChanged="obtenerData"
  />

  <!-- Modal Component -->
  <evidenciasModal
    :show="isModalVisible"
    :actividadId="modalData"
    @close="isModalVisible = false"
  ></evidenciasModal>
</template>

<script>
import apiSecretaria from "../../services/apiSecretaria";
import DataTableComponent from "../Plantillas/DataTableComponent.vue"; // Asegúrate de ajustar la ruta
import Swal from "sweetalert2";
import dayjs from "dayjs";
import ModalFormComponent from "../Secretaria/Modals/FormActividades.vue";
import logoSuperior from "../../assets/LogoSuperior";
import logoInferior from "../../assets/LogoInferior";
import evidenciasModal from "./Modals/evidenciasModal.vue";

export default {
  components: {
    DataTableComponent,
    ModalFormComponent,
    evidenciasModal,
  },
  data() {
    return {
      isModalVisible: false,
      modalData: "",
      secretariaData: [],
      columns: [
        { data: "idSecretaria" },
        { data: "rfc" },
        { data: "nivelEstudio" },
        { data: "nombreInstitucion" },
        { data: "areaEspecializacion" },
        {
          title: "Acciones",
          data: null,
          render: (data, type, row) => {
            return `
                        <button title="Editar Registro" class="btn-editar-registro bg-yellow-500 text-white p-2 pt-3 rounded" data-id="${data.idSecretaria}"><i class="pi pi-pencil pointer-events-none"></i></button>
                        <button title="Eliminar Registro" class="btn-eliminar-registro bg-red-500 text-white  p-2 pt-3  rounded" data-id="${data.idSecretaria}"><i class="pi pi-trash pointer-events-none"></i></button>
                        <button title="Ver Evidencias" class="btn-detalle-actividad bg-blue-500 text-white p-2 pt-3 rounded" data-id="${data.idSecretaria}"><i class="pi pi-info-circle pointer-events-none"></i></button>
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

              // Añadir margen superior al título
              if (doc.content[0].text) {
                // Verifica si hay un título
                doc.content[0].margin = [0, 10, 0, 0]; // 50 es el margen superior
              }

              // Añadir margen superior a la tabla para moverla hacia abajo
              if (doc.content[1].table) {
                // Verifica si hay una tabla
                doc.content[1].margin = [0, 10, 0, 0]; // 70 es el margen superior
              }
              doc["header"] = function (currentPage, pageCount, pageSize) {
                return {
                  image: logoSuperior,
                  width: 550,
                  alignment: "center",
                  margin: [0, 28, 0, 25], // Ajusta según necesites
                };
              };

              doc["footer"] = function (currentPage, pageCount, pageSize) {
                return {
                  image: logoInferior,
                  width: 450,
                  alignment: "center",
                  margin: [0, 10, 0, 10], // Ajusta según necesites
                };
              };
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
      dataID: null
    };
  },
  mounted() {
    this.obtenerData();

    this.$nextTick(() => {
      document.addEventListener("click", (event) => {
        // Verificar si se hizo clic en el botón de editar
        if (event.target.matches(".btn-editar-registro")) {
          const id = event.target.getAttribute("data-id");
          this.cargarEditar(id);
        }

        // Verificar si se hizo clic en el botón de eliminar
        if (event.target.matches(".btn-eliminar-registro")) {
          const id = event.target.getAttribute("data-id");
          this.eliminarActividad(id);
        }

        // Verificar si se hizo clic en el botón de detalle
        if (event.target.matches(".btn-detalle-actividad")) {
          const id = event.target.getAttribute("data-id");
          this.mostrarDetalleActividad(id);
        }
      });
    });
  },
  methods: {
    obtenerData() {
      apiSecretaria
        .obtenerSecretaria()
        .then((response) => {
          this.secretariaData = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener las actividades:", error);
        });
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
          apiSecretaria
            .eliminarDocente(id)
            .then((response) => {
              Swal.fire(
                "Eliminado!",
                "El registro fue eliminado correctamente",
                "success"
              );
              this.obtenerData();
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
    cargarEditar(id) {
      this.dataID = this.secretariaData.find((item) => item.idSecretaria == id);
      this.showModal = true;
    },
    openModal() {
      this.modalTitle = "Registrar Actividad";
      this.resetForm();
      this.formMode = "insertar"; 
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    mostrarDetalleActividad(id) {
      this.modalData = id; 
      this.isModalVisible = true;
    },
  },
};
</script>
