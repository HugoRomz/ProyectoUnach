<template>
    <div class="w-full p-4 ">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Mi Botón2
        </button>

        <div class="w-full">
            <div class="">
                <DataTable :data="actividades" :columns="columns" class="table table-striped table-bordered m-0"
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
</template>

<script>
    import DataTable from 'datatables.net-vue3'
    import Select from 'datatables.net-select';
    import ButtonsHtml5 from 'datatables.net-buttons/js/buttons.html5'
    import print from 'datatables.net-buttons/js/buttons.print'
    import pdfmake from 'pdfmake'
    import pdfFonts from 'pdfmake/build/vfs_fonts'
    pdfmake.vfs = pdfFonts.pdfMake.vfs;
    import 'datatables.net-responsive-dt';
    import JsZip from 'jszip'
    import api from '../../services/apiTutorias';

    window.JSZip = JsZip
    DataTable.use(pdfmake)
    DataTable.use(ButtonsHtml5)
    DataTable.use(Select);

    export default {
        components: {
            DataTable
        },
        data() {
            return {
                actividades: [],
                columns: [{
                        data: null,
                        render: function (data, type, row, meta) {
                            return `${meta.row + 1}`
                        }
                    },
                    {
                        data: 'nombre'
                    },
                    {
                        data: 'fecha',
                        render: function (data, type, row) {
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
                    {
                        data: 'descripcion'
                    },
                    {
                        data: 'prog_academico',
                        width: '15%'
                    },
                    {
                        title: 'Acciones',
                        data: null,
                        render: (data, type, row) => {
                            return `
                      <button class="bg-yellow-500 text-white p-2 rounded" @click="editarActividad(${data.id})">Editar</button>
                      <button class="bg-red-500 text-white p-2 rounded" @click="eliminarActividad(${data.id})">Eliminar</button>
                      <button class="bg-blue-500 text-white p-2 rounded" @click="detalleActividad(${data.id})">Detalles</button>
                    `;
                        },
                        // Esto permite que la columna se ajuste al contenido
                    }
                ],
                dtoptions: {
                    responsive: true,
                    autoWidth: false,
                    scrollY: '400px',
                    crollCollapse: true,
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
            }
        },
    }
</script>