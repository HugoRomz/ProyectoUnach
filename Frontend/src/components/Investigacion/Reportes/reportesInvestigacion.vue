<template>
  <HeaderModule titulo="Investigación - Reportes" ciclo="AGTO - NOV 2023" />
  <div class="container mx-auto flex flex-col justify-center items-center h-screen w-full md:w-3/4 lg:w-1/2 px-4">
    <!-- Otros elementos de tu plantilla... -->
    <div v-if="!showModal1 && !showModal2" @click="showModal1 = true" class="flex justify-center items-center space-x-4">
      <button
        class="bg-transparent border border-blue-500 text-blue-500 font-bold rounded transform transition duration-300 hover:scale-110 flex flex-col items-center justify-center p-4">
        <img src="/path-to-your-image-1.png" alt="Icono 1" class="mb-2"> <!-- Ajusta el margen como desees -->
        Reportes generados por estatus.
      </button>
      <button @click.stop="showModal2 = true"
        class="bg-transparent border border-green-500 text-green-500 font-bold rounded transform transition duration-300 hover:scale-110 flex flex-col items-center justify-center p-4">
        <img src="/path-to-your-image-2.png" alt="Icono 2" class="mb-2">
        Reportes generados por fecha.
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
                <th>Fecha Registrada</th>
                <th>Fecha Inicio</th>
                <th>Fecha Fin</th>
                <th>Linea de Investigacion</th>
                <th>Lider del Proyecto</th>
                <th>Estatus</th>
              </template>
            </DataTableComponent>
          </div>
        </div>
      </div>
      <button @click="showModal1 = false"
  class="absolute top-0 left-0 z-50 rounded-full h-8 w-8 bg-red-500 flex items-center justify-center text-white">
  <span class="font-semibold">X</span>
</button>
    </div>
    <!-- Modal 2 -->
    <div v-if="showModal2" class="... clases para estilos del modal ...">
      <input type="date" v-model="fechaInicio" 
  class="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out">
<input type="date" v-model="fechaFin" 
  class="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out">
  <button @click="generarPDFPorFechas">Generar Reporte</button>
      <!-- Contenido del Modal 2 -->
      <div class="w-full bg-white shadow-xl border rounded-lg border-gray-300 mb-3">
        <div class="w-full p-4">
          <div class="w-full">
            <DataTableComponent :data="proyectos" :columns="columns" :dtoptions="dtoptions">
              <template #headers>
                <th>ID</th>
                <th>Nombre</th>
                <th>Fecha registrada</th>
                <th>Fecha Inicio</th>
                <th>Fecha Fin</th>
                <th>Linea de Investigacion</th>
                <th>Lider del Proyecto</th>
                <th>Estatus</th>
                
              </template>
            </DataTableComponent>
          </div>
        </div>
      </div>
      <button @click="showModal2 = false">Cerrar</button>
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
import logoSuperior from '../../../assets/LogoSuperior';
import logoInferior from '../../../assets/LogoInferior';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default {
  props:{
    projectData: {
      type: Object,
      default: () => ({}),
    },
  },
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
      fechaInicio: null,
      fechaFin: null,
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
          data:"fecha_registro",
          render: function(data,type,row){
            if (type === "display" || type === "filter") {
              return dayjs(data).format("YYYY-MM-DD");
            }
            return data;
          }
        },
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

  // Título del PDF
  doc.setFontSize(18);
  doc.text('Reporte de Proyectos: ' + estado, 10, 10);

  // Convertir datos para AutoTable
  const datosTabla = proyectosFiltrados.map(proyecto => [
    proyecto.id,
    proyecto.nombre,
    // ... otros campos que quieras incluir
  ]);

  // Añadir tabla con AutoTable
  doc.autoTable({
    startY: 20, // Asegúrate de que esto esté debajo del título
    head: [['ID', 'Nombre']], // ... otros encabezados de columna]],
    body: datosTabla,
    theme: 'grid',
    styles: { fontSize: 10, cellPadding: 5, overflow: 'linebreak' },
    headStyles: { fillColor: [0, 46, 99], textColor: 255 }, // Colores personalizados
    columnStyles: {
      0: { cellWidth: 15 }, // Ejemplo de ajustar el ancho de una columna
      // ... ajustes para otras columnas
    },
    didDrawPage: function(data) {
      // Esta función se puede usar para añadir cosas como números de página
    },
    // ... otras opciones y estilos de AutoTable
  });

  // Guardar el PDF generado
  doc.save(`reporte_proyectos_${estado}.pdf`);
},

    generarPDFPorFechas() {
    const fechaInicio = dayjs(this.fechaInicio);
    const fechaFin = dayjs(this.fechaFin);

    const proyectosFiltrados = this.proyectos.filter(p => 
      dayjs(p.fecha_registro).isAfter(fechaInicio) && dayjs(p.fecha_registro).isBefore(fechaFin)
    );
    const datosTabla = proyectosFiltrados.map(proyecto => {
        return {
          id: proyecto.id,
          nombre: proyecto.nombre,
          fecha_registro: dayjs(proyecto.fecha_registro).format('YYYY-MM-DD')
        };
      });
    const doc = new jsPDF();
    
      //doc.text('Reporte de Proyectos por Fecha', 10, 10);
      doc.autoTable({
        didDrawPage:(data)=>{
          doc.addImage(logoSuperior,'JPEG',5,5,195,15);
          const centroX = (doc.internal.pageSize.width / 2) - (100 / 2);
          doc.addImage(logoInferior, 'JPEG', centroX, doc.internal.pageSize.height - 10, 100, 5);
        },
        head: [['ID', 'Nombre', 'Fecha Registro']],
        body: datosTabla.map(proyecto => [proyecto.id, proyecto.nombre, proyecto.fecha_registro]),
        startY: 30,
        styles: { fontSize: 8 },
        // ... otras configuraciones de AutoTable ...
      
      });

      doc.save(`reporte_proyectos_${this.fechaInicio}_${this.fechaFin}.pdf`);
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

  