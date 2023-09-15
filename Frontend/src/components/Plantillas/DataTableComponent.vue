<template>
  <div class="w-full">
    <DataTable
      :data="localData"
      :columns="columns"
      class="dt-responsive table table-striped table-bordered m-0"
      :options="dtoptions"
    >
      <thead>
        <tr>
          <slot name="headers"></slot>
        </tr>
      </thead>
    </DataTable>
  </div>
</template>

<script>
import print from "datatables.net-buttons/js/buttons.print";
import DataTable from "datatables.net-vue3";
import Select from "datatables.net-select";
import ButtonsHtml5 from "datatables.net-buttons/js/buttons.html5";
import DataTableLib from "datatables.net-bs5";
import pdfmake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfmake.vfs = pdfFonts.pdfMake.vfs;
import "datatables.net-responsive-dt";
import JsZip from "jszip";

window.JSZip = JsZip;
DataTable.use(pdfmake);
DataTable.use(DataTableLib);
DataTable.use(Select);

export default {
  components: {
    DataTable,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    dtoptions: {
      type: Object,
      default: () => ({
        responsive: true,
        autoWidth: false, // Corregido aquí
      }),
    },
  },
  data() {
    return {
      localData: this.data,
    };
  },
  watch: {
    data(newData) {
      this.localData = newData;
    },
  },
};
</script>
