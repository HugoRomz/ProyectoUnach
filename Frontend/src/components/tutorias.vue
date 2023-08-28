<template>
    <div class="container mx-auto">
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
        
    </div>
</template>

<script>
    import axios from 'axios'
    import DataTable from 'datatables.net-vue3'
    import Select from 'datatables.net-select';
    import DataTableLib from 'datatables.net-bs5'
    import Buttons from 'datatables.net-buttons-bs5'
    import ButtonsHtml5 from 'datatables.net-buttons/js/buttons.html5'
    import print from 'datatables.net-buttons/js/buttons.print'
    import pdfmake from 'pdfmake'
    import pdfFonts from 'pdfmake/build/vfs_fonts'
    pdfmake.vsf = pdfFonts.pdfMake.vsf;
    import 'datatables.net-responsive-bs5'
    import JsZip from 'jszip'
    import api from '../services/apiTutorias';
    import Navbar from './navbar.vue';

    window.JsZip = JsZip
    DataTable.use(DataTableLib)
    DataTable.use(pdfmake)
    DataTable.use(ButtonsHtml5)
    DataTable.use(Select);
    export default{
        components: {DataTable},
        data(){
            return{
                actividades:[],
                columns:[
                    {data:null, render: function(data,type,row,meta)
                    {return `${meta.row+1}`}},
                    {data:'nombre'},
                    {data:'fecha'},
                    {data:'descripcion'},
                    {data:'prog_academico'}
                ],
                dtoptions:{
                    responsive: true,
                    autoWidth: false,
                    dom: 'Bfrtip',
                    language: {
                        search: 'Buscar',
                        zeroRecords: 'No hay registros para mostrar',
                        info: 'Mostrando del START al END de TOTAL registros',
                        infoFiltered: '(Filtrados de MAX registros)',
                        paginate: { first: 'Primero', previous: 'Anterior', next: 'Siguiente', last: 'Ultimo' }
                    },
                    buttons: [
                        {
                        extend: 'pdfHtml5', 
                        text: 'PDF',
                        className: 'bg-gray-500 text-white p-2 rounded mx-3', // Aquí agregas las clases de Tailwind
                        customize: function(doc) {
                            // Personalizar el documento PDF aquí
                        }
                        },
                        {
                        extend: 'excelHtml5',
                        text: 'Excel',
                        className: 'bg-gray-500 text-white p-2 rounded mx-3'
                        },
                        {
                        extend: 'csvHtml5',
                        text: 'CSV',
                        className: 'bg-gray-500 text-white p-2 rounded mx-3'
                        },
                        {
                        extend: 'print',
                        text: 'Imprimir',
                        className: 'bg-gray-500 text-white p-2 rounded mx-3'
                        },
                        {
                        extend: 'copyHtml5',
                        text: 'Copiar',
                        className: 'bg-gray-500 text-white p-2 rounded mx-3'
                        }
                    ]
                }
            }
        },
        mounted(){
            this.obtenerActividades()
        },
        methods:{
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

<style>
    @import 'datatables.net-bs5'
</style>