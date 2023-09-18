<template>
  <div class="container mx-auto">
    <HeaderComponent
      titulo="Programa de Accion Tutorial (PAT)"
      ciclo="AGTO - NOV 2023"
    />
    <div class="w-full bg-white shadow-xl border rounded-lg border-gray-300 mb-7">
      <button
        @click="showModal = true"
        class="bg-blue-500 text-white font-bold p-2 rounded m-4"
      >
        Registrar Actividad
      </button>
      <tutoriasDataTableVue ref="datatableComponent" />
    </div>
    <ModalFormComponent
      :visible="showModal"
      @update:visible="handleClose"
      @activityChanged="fetchActivities"
    />
  </div>
</template>

<script>
import HeaderComponent from "../components/HeaderModuleComponent.vue";
import tutoriasDataTableVue from "../components/Tutorias/tutoriasDatatableVue.vue";
import ModalFormComponent from "../components/Tutorias/Modals/FormActividades.vue";

export default {
  components: {
    HeaderComponent,
    tutoriasDataTableVue,
    ModalFormComponent,
  },
  data() {
    return {
      showModal: false, // Controla si se muestra o no la ventana flotante
    };
  },
  methods: {
    handleClose(value) {
      this.showModal = value;
    },
    fetchActivities() {
      this.$refs.datatableComponent.updateData();
    },
  },
};
</script>
