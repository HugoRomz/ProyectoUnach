<template>
  <div class="w-full p-4">
    <div class="w-full">
      <DataTableComponent
        :data="proyectos"
        :columns="columns"
        :dtoptions="dtoptions"
      >
        <template #headers>
          <th>ID</th>
          <th>Nombre</th>
          <th>Fecha Inicio</th>
          <th>Fecha Fin</th>
          <th>Linea de Investigacion</th>
          <th>Lider del Proyecto</th>
          <th>Status</th>
          <th>Colaboradores</th>
          <th>Evidencias</th>
          <th>Acciones</th>
        </template>
      </DataTableComponent>
    </div>
  </div>
  <ModalFormComponent
    :visible="showModal"
    :idProyecto="editingId"
    @update:visible="closeModal"
    @projectsChanged="obtenerProyectos"
  />

  <!-- Modal Component -->
  <colaboradoresModal
    :show="isModalVisible"
    :projectId="modalData"
    @close="isModalVisible = false"
  ></colaboradoresModal>

  <!-- Modal Component -->
  <evidenciasModal
    :show="isModalEvidenciaVisible"
    :projectId="modalData"
    @close="isModalEvidenciaVisible = false"
  ></evidenciasModal>
</template>

<script>
import DataTableComponent from "../Plantillas/DataTableComponent.vue";
import apiInvestigacion from "../../services/apiInvestigacion";
import ModalFormComponent from "../Investigacion/Modals/FormProyectos.vue";
import dayjs from "dayjs";
import colaboradoresModal from "../Investigacion/Modals/ColaboradoresModal.vue";
import evidenciasModal from "../Investigacion/Modals/EvidenciasModal.vue";

export default {
  components: {
    DataTableComponent,
    ModalFormComponent,
    colaboradoresModal,
    evidenciasModal
  },
  data() {
    return {
      proyectos: [],
      showModal: false,
      editingId: null,
      modalData: "",
      isModalVisible: false,
      isModalEvidenciaVisible: false,
      columns: [
        { data: "id" },
        { data: "nombre" },
        {
          data: "fecha_inicio",
          render: function (data, type, row) {
            if (type === "display" || type === "filter") {
              return dayjs(data).format("YYYY-MM-DD"); // ajusta el formato como desees
            }
            return data;
          },
        },
        {
          data: "fecha_final",
          render: function (data, type, row) {
            if (type === "display" || type === "filter") {
              return dayjs(data).format("YYYY-MM-DD"); // ajusta el formato como desees
            }
            return data;
          },
        },
        { data: "linea_investigacion" },
        { data: "lider_de_proyecto" },
        { data: "estatus" },
        {
          data: null,
          title: "Colaboradores",
          render: (data, type, row) => {
            return `
                        <button class="btn-colaboradores bg-blue-500 text-white p-2 pt-2 rounded" data-id="${data.id}">Colaboradores</button>
                      `;
          },
        },
        {
          data: null,
          title: "Evidencias",
          render: (data, type, row) => {
            return `
                        <button class="btn-evidencias bg-gray-500 text-white p-2 pt-2 rounded" data-id="${data.id}">Evidencias</button>
                      `;
          }
        },
        {
          title: "Acciones",
          data: null,
          render: (data, type, row) => {
            return `
                        <button class="btn-editar-actividad bg-yellow-500 text-white p-2 pt-3 rounded" data-id="${data.id}"><i class="pi pi-pencil pointer-events-none"></i></button>
                        <button class="btn-eliminar-actividad bg-red-500 text-white  p-2 pt-3  rounded" data-id="${data.id}"><i class="pi pi-trash pointer-events-none"></i></button>
                        <button class="btn-detalle-proyecto bg-blue-500 text-white p-2 pt-3 rounded" data-id="${data.id}"><i class="pi pi-info-circle pointer-events-none"></i></button>
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
            tittle: "Reporte de Proyectos de Investigacion",
            extend: "excelHtml5",
            text: "Excel",
            className: "bg-green-500 btn btn-success border-0",
          },
          {
            tittle: "Reporte de Proyectos de Investigacion",
            extend: "pdfHtml5",
            text: '<i class="fa-regular fa-file"></i> PDF',
            className: "bg-red-500 btn btn-danger border-0",
            customize: function (doc) {
              // Personalizar el documento PDF aquí

              // Añadir margen superior al títuloz
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
            tittle: "Reporte de Proyectos de Investigacion",
            extend: "print",
            text: "Imprimir",
            className: "bg-gray-500 btn btn-dark border-0",
          },
          {
            tittle: "Reporte de Proyectos de Investigacion",
            extend: "copy",
            text: "Copiar Texto",
            className: "bg-slate-300 btn btn-light border-0",
          },
        ],
      },
    };
  },
  mounted() {
    this.obtenerProyectos();

    this.$nextTick(() => {
      document.addEventListener("click", (event) => {
        // Verificar si se hizo clic en el botón de detalle
        if (event.target.matches(".btn-colaboradores")) {
          const id = event.target.getAttribute("data-id");
          this.mostrarDetalleColaboradores(id);
        }
      });

      document.addEventListener("click", (event) => {
        // Verificar si se hizo clic en el botón de detalle
        if (event.target.matches(".btn-evidencias")) {
          const id = event.target.getAttribute("data-id");
          this.mostrarDetalleEvidencias(id);
        }
      });
    });
  },
  methods: {
    closeModal() {
      this.showModal = false;
    },
    obtenerProyectos() {
      apiInvestigacion
        .obtenerProyectos()
        .then((response) => {
          this.proyectos = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener los proyectos:", error);
        });
    },
    updateData() {
      this.obtenerProyectos(); // Esta función ya esta definida para obtener las actividades
    },
    mostrarDetalleColaboradores(id) {
      this.modalData = id; // Solo guarda el ID en lugar de todo el objeto de datos
      this.isModalVisible = true;
    },
    mostrarDetalleEvidencias(id) {
      this.modalData = id; // Solo guarda el ID en lugar de todo el objeto de datos
      this.isModalEvidenciaVisible = true;
    },
  },
};
</script>
