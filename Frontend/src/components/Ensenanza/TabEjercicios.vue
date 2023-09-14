<template>
    <div class="w-full p-4 ">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="showAlert">
         Aleerta
        </button>
        <div>
          <DataTableComponent :data="data" :columns="columns" :dtoptions="dtoptions">
                    <template #headers>
                        <th>matricula_doc</th>
                        <th>nomb_doce</th>
                        <th>apellidos</th>
                        <th>edad</th>
                        <th>num_plaza</th>
                        <th>sexo</th>
                        <th>rfc</th>
                        <th>Acciones</th>
                    </template>
          </DataTableComponent>   
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
import api from '../../services/api';
import DataTableComponent from '../Plantillas/DataTableComponent.vue'; 

export default {
  components: {
        DataTableComponent // Cambiado a nuestro componente personalizado
    },
    data() {
        return {
                data: [],
                columns: [
                    {
                        data: 'matricula_doc'
                    },
                    {                      
                        data: 'nomb_doce'
                    },
                    {
                        data: 'apellidos'
                    },
                    {
                        data: 'edad'
                    },
                    {
                        data: 'num_plaza'
                    },
                    {
                        data: 'sexo'
                    },
                    {
                        data: 'rfc'
                    },
                    {
                        title: 'Acciones',
                        data: null,
                        render: (data, type, row) => {
                            return `
                      <button id="btn-editar" class="bg-yellow-500 text-white p-2 rounded" data-id="${data.matricula_doc}">Editar</button>
                    `;
                        },
                        // Esto permite que la columna se ajuste al contenido
                    }
                ],
                dtoptions: {
                    dom: 'Bfrtip',
                    language: {
                        search: 'Buscar',
                        zeroRecords: 'No hay registros para mostrar',
                        info: 'Mostrando del _START_ al _END_ de _TOTAL_ registros',
                        infoFiltered: '(Filtrados de _MAX_ registros)',
                        paginate: {
                            first: 'Primero',
                            previous: 'Anterior',
                            next: 'Siguiente',
                            last: 'Ultimo'
                        }
                    },
                    buttons: [{
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
            };
    },
    mounted() {
        this.obtenerArticulos();
        this.$nextTick(() => {
              document.addEventListener('click', event => {
                  // Verificar si se hizo clic en el botón de editar
                  if (event.target.matches('#btn-editar')) {
                      const id = event.target.getAttribute('data-id');
                      this.editarActividad();
                  }
              });
          });
    },
  methods: {
    obtenerArticulos() {
            api.obtenerArticulos()
                .then(response => {
                    this.data = response.data;
                })
                .catch(error => {
                    console.error('Error al obtener las data:', error);
                });
        },
    editarActividad() {
      Swal.fire({
        title: '¡Éxito!',
        text: 'Esto es una alerta de SweetAlert2',
        icon: 'success'
      });
    },

    showAlert() {
      Swal.fire({
        title: '¡Éxito!',
        text: 'Esto es una alerta de SweetAlert2',
        icon: 'success'
      });
    }
  }
}
</script>