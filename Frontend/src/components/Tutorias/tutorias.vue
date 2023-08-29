<template>
    <div class="container mx-auto">
        <!-- Botón para abrir la ventana flotante -->
      <button @click="openModal" class="bg-blue-500 text-white p-2 rounded mt-4">Registrar Actividad</button>
      <div class="mt-8 flex flex-wrap space-x-0 space-y-2 md:space-x-4 md:space-y-0">
        <div class="flex-1 bg-white p-4 shadow-xl border rounded-lg md:w-1/2">
          <div class="row">
            <div class="w-full">
              <div class="table responsive">
                <DataTable :data="actividades" :columns="columns" class="table table-striped table-bordered display"
                :options="dtoptions">
                  <thead>
                    <tr>
                      <th>No_Actividad</th>
                      <th>Nombre</th>
                      <th>Fecha</th>
                      <th>Descripcion</th>
                      <th>Programa Academico</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                </DataTable>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Ventana flotante con formulario -->
  <div v-if="showModal" class="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center">
    <div class="bg-white p-8 rounded-lg w-1/2">
      <h2 class="text-lg mb-4 text-center font-semibold">Registra Actividad</h2>
      <form @submit.prevent="submitForm" class="space-y-4">
        <div class="flex flex-col">
          <label for="nombre" class="text-sm font-semibold">Nombre:</label>
          <input type="text" id="nombre" v-model="form.nombre" class="p-2 rounded border focus:border-blue-400">
        </div>
        <div class="flex flex-col">
          <label for="fecha" class="text-sm font-semibold">Fecha:</label>
          <input type="date" id="fecha" v-model="form.fecha" class="p-2 rounded border focus:border-blue-400">
        </div>
        <div class="flex flex-col">
          <label for="descripcion" class="text-sm font-semibold">Descripción:</label>
          <textarea id="descripcion" v-model="form.descripcion" rows="4" class="p-2 rounded border focus:border-blue-400"></textarea>
        </div>
        <div class="flex flex-col">
          <label for="prog_academico" class="text-sm font-semibold">Programa Académico:</label>
          <select id="prog_academico" v-model="form.prog_academico" class="p-2 rounded border focus:border-blue-400">
            <option disabled value="">Por favor seleccione una opción</option>
            <option>LIDTS</option>
            <option>LC</option>
            <option>Ambas</option>
          </select>
        </div>
        
        <div class="flex flex-col">
          <label for="evidencias" class="text-sm font-semibold mb-2">Evidencias:</label>
          <input type="file" id="evidencias" multiple @change="handleFileUpload($event)" class="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-500 file:text-white
          hover:file:bg-blue-600
          border
          rounded
          ">
        </div> 

        <button type="submit" class="w-full bg-primaryBlue text-white p-2 rounded hover:bg-SecundaryGold">Guardar</button>
      </form>
      <button @click="closeModal" class="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 mt-4">Cerrar</button>
    </div>
  </div>
  </div>
  </template>
  
  <script>
  import DataTable from 'datatables.net-vue3'
  import Select from 'datatables.net-select';
  import DataTableLib from 'datatables.net-bs5'
  import Buttons from 'datatables.net-buttons-bs5'
  import ButtonsHtml5 from 'datatables.net-buttons/js/buttons.html5'
  import print from 'datatables.net-buttons/js/buttons.print'
  import pdfmake from 'pdfmake'
  import pdfFonts from 'pdfmake/build/vfs_fonts'
  pdfmake.vfs = pdfFonts.pdfMake.vfs;
  import 'datatables.net-responsive-bs5'
  import JsZip from 'jszip'
  import api from '../../services/apiTutorias';

  window.JSZip = JsZip
  DataTable.use(DataTableLib)
  DataTable.use(pdfmake)
  DataTable.use(ButtonsHtml5)
  DataTable.use(Select);

  export default {
      components: { DataTable },
      data() {
          return { 
              actividades: [],
              columns: [
                  { data: null, render: function (data, type, row, meta) { return `${meta.row + 1}` } },
                  { data: 'nombre' },
                  { data: 'fecha',
                      render: function(data, type, row) {
                      if (type === 'display' || type === 'filter') {
                        var fecha = new Date(data);
                        var dia = fecha.getDate();
                        var mes = fecha.getMonth() + 1;
                        var año = fecha.getFullYear();
                        return `${año}-${mes < 10 ? '0' + mes : mes}-${dia < 10 ? '0' + dia : dia}`;
                      }
                      return data; // para otros tipos de datos, devuelves el valor original
                    }
                  },
                  { data: 'descripcion' },
                  { data: 'prog_academico' }
              ],
              dtoptions: {
                  responsive: true,
                  autoWidth: false,
                  dom: 'Bfrtip',
                  language: {
                      search: 'Buscar',
                      zeroRecords: 'No hay registros para mostrar',
                      info: 'Mostrando del _START_ al _END_ de _TOTAL_ registros',
                      infoFiltered: '(Filtrados de _MAX_ registros)',
                      paginate: { first: 'Primero', previous: 'Anterior', next: 'Siguiente', last: 'Ultimo' }
                  },
                  buttons: [
                      {
                          tittle: 'Reporte de actividades PAT',
                          extend: 'excelHtml5',
                          text: 'Excel',
                          className: 'bg-green-500 btn btn-success border-0'
                      }, 
                      { 
                          tittle: 'Reporte de actividades PAT',
                          extend: 'pdfHtml5',
                          text: '<i class="fa-regular fa-file"></i> PDF',
                          className: 'bg-red-500 btn btn-danger border-0',
                          customize: function (doc) {
                              // Personalizar el documento PDF aquí
                          }
                      },
                                           
                      {
                          tittle: 'Reporte de actividades PAT',
                          extend: 'print',
                          text: 'Imprimir',
                          className: 'bg-gray-500 btn btn-dark border-0'
                      },
                      {
                          tittle: 'Reporte de actividades PAT',
                          extend: 'copy',
                          text: 'Copiar Texto',
                          className: 'bg-slate-300 btn btn-light border-0'
                      }
                  ],
              },
              // Para el formulario y la ventana flotante
              form: {
                  nombre: '',
                  fecha: '',
                  descripcion: '',
                  prog_academico: '',
                  evidencias: null
              },
              showModal: false // Controla si se muestra o no la ventana flotante
          }
      },
      mounted() {
          this.obtenerActividades()
      },
      methods: {
          obtenerActividades() {
              api.obtenerActividades()
                  .then(response => {
                      this.actividades = response.data;
                  })
                  .catch(error => {
                      console.error('Error al obtener las actividades:', error);
                  });
          },
          handleFileUpload(event) {
            this.form.evidencias = event.target.files;
          },
          // Nuevas funciones para abrir y cerrar la ventana flotante
          openModal() {
              this.showModal = true;
          },
          closeModal() {
              this.showModal = false;
          },
          // Función para manejar el envío del formulario
          submitForm() {

            // Verifica si los campos del formulario están vacíos
            if (!this.form.nombre || !this.form.fecha || !this.form.descripcion || !this.form.prog_academico) {
              alert("Todos los campos son obligatorios");
              return;
            }

            api.insertarActividad(this.form)
            .then(response => {
                console.log('Formulario enviado exitosamente', response);
                this.obtenerActividades(); // Actualiza la lista de actividades
                this.showModal = false;

            })
            .catch(error => {
                console.error('Hubo un error enviando el formulario', error);
            });
            }
      },
  }
</script>