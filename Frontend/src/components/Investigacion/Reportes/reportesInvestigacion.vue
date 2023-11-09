<template>
  <HeaderModule titulo="Investigación - Reportes" ciclo="AGTO - NOV 2023" />
  <div class="container mx-auto flex flex-col justify-center items-center h-screen">

    <!-- Otros elementos de tu plantilla... -->
    <div v-if="!showModal1 && !showModal2" @click="showModal1 = true" class="flex justify-center items-center space-x-4">
      <button
        class="bg-transparent border border-blue-500 text-blue-500 font-bold rounded transform transition duration-300 hover:scale-110 flex flex-col items-center justify-center p-4">
        <img src="/path-to-your-image-1.png" alt="Icono 1" class="mb-2"> <!-- Ajusta el margen como desees -->
        Botón 1
      </button>
      <button @click="showModal2 = true"
        class="bg-transparent border border-green-500 text-green-500 font-bold rounded transform transition duration-300 hover:scale-110 flex flex-col items-center justify-center p-4">
        <img src="/path-to-your-image-2.png" alt="Icono 2" class="mb-2"> <!-- Ajusta el margen como desees -->
        Botón 2
      </button>
    </div>
    <div v-if="showModal1" class="">
      <!-- Contenido del Modal 1 -->
    <div class="w-full bg-white shadow-xl border rounded-lg border-gray-300 mb-3">
      <div class="w-full p-4">
        <div class="w-full">
          <button @click="generarPDFPorEstado(1)">Imprimir PDF de Proyectos Activos </button>
          <button @click="generarPDFPorEstado(2)">Imprimir PDF de Proyectos Pendientes </button>
          <button @click="generarPDFPorEstado(3)">Imprimir PDF de Proyectos Finalizados </button>
          <DataTableComponent :data="proyectos" :columns="columns" :dtoptions="dtoptions">
            <template #headers>
              <th>ID</th>
              <th>Nombre</th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
              <th>Linea de Investigacion</th>
              <th>Lider del Proyecto</th>
              <th>Estatus</th>
            </template>
          </DataTableComponent>
        </div>
      </div>
      <button @click="showModal1 = false">Cerrar</button>
    </div>
  
    
    <!-- Modal 2 -->
    <div v-if="showModal2" class="... clases para estilos del modal ...">
      <!-- Contenido del Modal 2 -->
      <button @click="showModal2 = false">Cerrar</button>
    </div>
  </div>
  </div>
</template>

<script>
import DataTableComponent from '../../Plantillas/DataTableComponent.vue';
import apiInvestigacion from '../../../services/apiInvestigacion';
import ModalFormComponent from '../../Investigacion/Modals/FormProyectos.vue'
import dayjs from 'dayjs';
import colaboradoresModal from '../../Investigacion/Modals/ColaboradoresModal.vue';
import evidenciasModal from '../../Investigacion/Modals/EvidenciasModal.vue'
import ProyectoDetallesModal from '../Modals/ProyectoDetallesModal.vue';
import HeaderModule from "../../HeaderModuleComponent.vue";
import jsPDF from 'jspdf';
export default {
  components: {
    DataTableComponent,
    ModalFormComponent,
    colaboradoresModal,
    evidenciasModal,
    ProyectoDetallesModal,
    HeaderModule,
  },
  data() {
    return {
      proyectos: [],
      showModal: false,
      editingId: null,
      modalData: "",
      isModalVisible: false,
      isModalEvidenciaVisible: false,
      showModal1: false,
      showModal2: false,
      isProyectoDetallesVisible: false,
      selectedProject: {},
      selectedProjectCollaborators: [],

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
        {
          data: "estatus",
          render: (data, type, row) => {
            if (data == 1) {
              return '<span class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Activo</span>';
            } else if (data == 2) {
              return '<span class="inline-flex items-center rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/10">En proceso</span>';
            } else if (data == 3) {
              return '<span class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">Finalizado</span>';
            }
          }
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

      document.addEventListener("click", (event) => {
        if (event.target.matches(".btn-detalle-proyecto")) {
          const id = parseInt(event.target.getAttribute("data-id"));
          this.mostrarDetalleProyecto(id);
        }
      });

      document.addEventListener("click", (event) => {
        // Verificar si se hizo clic en el botón de editar
        if (event.target.matches(".btn-editar-proyecto")) {
          const id = event.target.getAttribute("data-id");
          this.cargarDatosParaEditar(id);
        }
      });

    });
  },
  methods: {
    toggleDarkMode() {
      this.$store.commit('toggleDarkMode');
      document.body.classList.toggle('dark-mode');
    },
    generarPDFPorEstado(estado) {
      const proyectosFiltrados = this.proyectos.filter(p => p.estatus === estado);

      const doc = new jsPDF();

      // Configura el PDF, agrega texto, tablas, etc.
      doc.text('Reporte de Proyectos: ' + estado, 10, 10);
      proyectosFiltrados.forEach((proyecto, index) => {
        // Añade los detalles de cada proyecto al PDF
        // Ajusta las coordenadas según necesites
        doc.text(10, (index + 1) * 10 + 20, `ID: ${proyecto.id} - Nombre: ${proyecto.nombre}`);
        // ... y así sucesivamente para cada campo que desees incluir
      });

      // Guardar el PDF generado
      doc.save(`reporte_proyectos_${estado}.pdf`);
    },
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
    cargarDatosParaEditar(id) {
      this.editingId = id; // Asigna el ID a editar
      this.showModal = true;
    },
    mostrarDetalleColaboradores(id) {
      this.modalData = id; // Solo guarda el ID en lugar de todo el objeto de datos
      this.isModalVisible = true;
    },
    mostrarDetalleEvidencias(id) {
      this.modalData = id; // Solo guarda el ID en lugar de todo el objeto de datos
      this.isModalEvidenciaVisible = true;
    },
    mostrarDetalleProyecto(id) {
      const proyecto = this.proyectos.find((p) => p.id === id);
      this.selectedProject = proyecto;

      // Obtener colaboradores para el proyecto específico
      apiInvestigacion
        .obtenerColaboradores(id)
        .then((response) => {
          this.selectedProjectCollaborators = response.data;
          this.isProyectoDetallesVisible = true;
        })
        .catch((error) => {
          console.error("Error al obtener los colaboradores:", error);
        });
    },
  },
};
</script>

<style>
body.dark-mode {
  background-color: #1a1a1a;
  color: #f0f0f0;
  /* Otros estilos para el modo oscuro */
}
</style>

  