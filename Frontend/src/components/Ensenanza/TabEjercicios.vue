<template>
  <div class="w-full p-4">
    <div class="w-full">
      <DataTableComponent
        :data="actEjercicios"
        :columns="columns"
        :dtoptions="dtoptions"
      >
        <template #headers>
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Tipo</th>
          <th>Materia</th>
          <th>Ciclo Escolar</th>
          <th>Fecha</th>
          <th>Acciones</th>
        </template>
      </DataTableComponent>
      <!-- Modal Component -->
      <evidenciasModal
        :show="isModalVisible"
        :actividadId="modalData"
        @close="isModalVisible = false"
      ></evidenciasModal>
    </div>
  </div>
</template>

<script>
import apiEnsenanza from "../../services/apiEnsenanza";
import DataTableComponent from "../Plantillas/DataTableComponent.vue";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import { mapGetters } from "vuex";

import evidenciasModal from "./Modals/evidenciasModal.vue";

import logoSuperior from "../../assets/LogoSuperior";
import logoInferior from "../../assets/LogoInferior";

export default {
  components: {
    DataTableComponent,
    evidenciasModal,
  },
  data() {
    return {
      isModalVisible: false,
      modalData: "",
      actEjercicios: [],
      columns: [
        { data: "idActEnsenanza" },
        { data: "nombreAct" },
        { data: "descripcionAct" },
        { data: "nombretipoAct" },
        { data: "nombreMateria" },
        { data: "cicloEscolar" },
        {
          data: "fecha",
          render: function (data, type, row) {
            if (type === "display" || type === "filter") {
              return dayjs(data).format("YYYY-MM-DD"); // ajusta el formato como desees
            }
            return data;
          },
        },
        {
          title: "Acciones",
          data: null,
          render: (data, type, row) => {
            return `
                        <button class="btn-editar-actividad bg-yellow-500 text-white p-2 pt-3 rounded" data-id="${data.idActEnsenanza}"><i class="pi pi-pencil pointer-events-none"></i></button>
                        <button class="btn-eliminar-actividad bg-red-500 text-white  p-2 pt-3  rounded" data-id="${data.idActEnsenanza}"><i class="pi pi-trash pointer-events-none"></i></button>
                        <button class="btn-detalle-actividad bg-blue-500 text-white p-2 pt-3 rounded" data-id="${data.idActEnsenanza}"><i class="pi pi-info-circle pointer-events-none"></i></button>
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
            text: "PDF",
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
    };
  },
  computed: {
    ...mapGetters(["getSelectedMateria"]),
    actualizarTabla() {
      return this.$store.state.actualizarTabla;
    },
  },
  watch: {
    actualizarTabla() {
      this.obtenerData();
    },
  },
  mounted() {
    this.obtenerData();
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
      apiEnsenanza.obtenerActividades(1).then((response) => {
        if (this.getSelectedMateria) {
          this.actEjercicios = response.data.filter(
            (act) => act.idMateria === this.getSelectedMateria
          );
        } else {
          this.actEjercicios = [];
        }
      });
    },
    cargarActividadParaEditar(id) {
      const actividadAEditar = this.actEjercicios.find(
        (act) => act.idActEnsenanza == id
      );
      this.$store.dispatch("setActividadAEditar", actividadAEditar);
    },
    eliminarActividad(id) {
      Swal.fire({
        title: "¿Estás seguro de eliminar la actividad?",
        text: "Esta acción no se puede revertir",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          apiEnsenanza
            .eliminarActividad(id)
            .then((response) => {
              Swal.fire(
                "Actividad eliminada",
                "La actividad se eliminó correctamente",
                "success"
              );
              this.obtenerData();
            })
            .catch((error) => {
              console.error("Error al eliminar la actividad:", error);
              Swal.fire(
                "Error al eliminar la actividad",
                "Ocurrió un error al eliminar la actividad",
                "error"
              );
            });
        }
      });
    },
    mostrarDetalleActividad(id) {
      this.modalData = id; // Solo guarda el ID en lugar de todo el objeto de datos
      this.isModalVisible = true;
    },
  },
};
</script>
