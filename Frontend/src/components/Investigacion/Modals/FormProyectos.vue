<template>
  <!-- Ventana flotante con formulario -->
  <div
    v-if="visible"
    class="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center"
  >
    <div class="bg-white p-8 rounded-lg w-1/2">
      <h2 class="text-lg mb-4 text-center font-semibold">{{ modalTitle }}</h2>
      <form class="w-full" @submit.prevent="submitForm">
        <input type="text" id="idProyecto" v-model="form.idProyecto" />
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="nombre"
            >
              Nombre del Proyecto:
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="nombreProyecto"
              v-model="form.nombreProyecto"
              type="text"
              placeholder=""
            />
          </div>
        </div>
        <button
          type="submit"
          class="w-full bg-blue-800 text-white p-2 rounded hover:bg-blue-900"
        >
          Guardar
        </button>
      </form>
      <button
        @click="closeModal"
        class="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 mt-4"
      >
        Cerrar
      </button>
    </div>
  </div>
</template>

<script>
import VueMultiselect from "vue-multiselect";
import Swal from "sweetalert2";

export default {
  props: ["visible", "idProyecto"],
  components: { VueMultiselect },
  data() {
    return {
      form: {
        idProyecto: "",
        nombreProyecto: "",
      },
      modalTitle: "Insertar",
    };
  },
  methods: {
    closeModal() {
      this.$emit("update:visible", false);
      this.resetForm();
    },
    resetForm() {
      this.form = {
        idProyecto: "",
        nombreProyecto: "",
      };
    },
  },
  mounted() {},
};
</script>
