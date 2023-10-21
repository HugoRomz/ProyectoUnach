<!-- ProyectoDetallesModal.vue -->

<template>
  <div v-if="show" class="modal">
    <div class="modal-content">
      <span @click="closeModal" class="close">&times;</span>
      <h2>Detalles del Proyecto</h2>
      <div v-if="projectData">
        <p><strong>ID:</strong> {{ projectData.id }}</p>
        <p><strong>Nombre:</strong> {{ projectData.nombre }}</p>
        <p><strong>Ciclo Escolar:</strong> {{ projectData.ciclo_escolar }}</p>
        <p><strong>Fecha de Inicio:</strong> {{ formatDate(projectData.fecha_inicio) }}</p>
        <p>
          <strong>Fecha de Finalizacion:</strong> {{ formatDate(projectData.fecha_final) }}
        </p>
        <p>
          <strong>Linea de Investigacion:</strong>
          {{ projectData.linea_investigacion }}
        </p>
        <p>
          <strong>Lider del proyecto:</strong>
          {{ projectData.lider_de_proyecto }}
        </p>
        <p><strong>Status:</strong> {{ projectData.estatus }}</p>
        <p>
          <strong>Recursos Utilizados:</strong>
          {{ projectData.recursos_utilizados }}
        </p>
        <p>
          <strong>Tipo de Recurso:</strong> {{ projectData.tipo_de_recurso }}
        </p>
        <!-- Agrega aquí todos los campos que desees mostrar -->
        <h3>Colaboradores</h3>
      <ul>
        <li v-for="collaborator in collaboratorsData" :key="collaborator.id">
          {{ collaborator.nombre }} - {{ collaborator.tipo }}
          <!-- Más campos del colaborador aquí -->
        </li>
      </ul>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    projectData: {
      type: Object,
      default: () => ({}),
    },
    collaboratorsData: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    formatDate(date) {
      return dayjs(date).format("YYYY-MM-DD");
    }
  },
};
</script>

<style scoped>
.modal {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
}

.modal-content {
  position: relative;
  background-color: #fff;
  margin: 15% auto;
  padding: 20px;
  width: 50%;
}

.close {
  position: absolute;
  top: 5px;
  right: 10px;
  cursor: pointer;
}
</style>
