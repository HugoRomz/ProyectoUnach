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
    </div>
  </div>
  <!-- <ModalFormComponent
    :visible="showModal"
    :id_act="editingId"
    @update:visible="closeModal"
    @activityChanged="obtenerData"
  /> -->
</template>

<script>
import apiEnsenanza from "../../services/apiEnsenanza";
import DataTableComponent from "../Plantillas/DataTableComponent.vue";
import Swal from "sweetalert2";

// import ModalFormComponent from "";

import logoSuperior from "../../assets/LogoSuperior";
import logoInferior from "../../assets/LogoInferior";

export default {
  components: {
    DataTableComponent,

  },
  //   idActEnsenanza":1,"nombreAct":"Bubble Sort","descripcionAct":"Creacion de un algoritmo bubble sort","tipoAct":1,"materia":5,"cicloEscolar":"2023-Agosto-Diciembre","fecha":"2023-05-05T06:00:00.000Z"}]
  data() {
    return {
      actEjercicios: [],
      columns: [
        {data: "idActEnsenanza"},
         { data: "nombreAct"},
         { data: "descripcionAct"},
         { data: "nombretipoAct"},
         { data: "nombreMateria"},
         { data: "cicloEscolar"},
         { data: "fecha",
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
      showModal: false,
      editingId: null,
    };
  },
  mounted() {
    this.obtenerData();
  },
  methods: {
    obtenerData() {
      apiEnsenanza
        .obtenerActividades(1)
        .then((response) => {
          this.actEjercicios = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener las actividades:", error);
        });
    },
  },
};
</script>
