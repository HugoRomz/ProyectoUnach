<template>
  <div class="container mx-auto">
    <HeaderModule
      titulo="Gestion Enseñanza - Aprendizaje"
      ciclo="AGTO - NOV 2023"
    />
    <div
      class="w-full bg-white shadow-xl border rounded-lg border-gray-300 mb-3"
    >
      <formEsenanza />
    </div>
    <div
      class="w-full bg-white shadow-xl border rounded-lg border-gray-300 mb-3"
    >
      <div class="w-2/3 m-5">
        <label
          class="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
          for="tipoActividad"
        >
          Seleccione la Materia:
        </label>
        <Multiselect
          v-model="selMateria"
          :options="materias"
          label="nombreMateria"
          track-by="materia"
          placeholder="Selecciona una materia"
          @select="actualizarContenido"
        />
      </div>
    </div>
    <div
      v-if="selMateria"
      class="w-full bg-white shadow-xl border rounded-lg border-gray-300"
    >
      <TabComponentEnsenanza/>
    </div>
  </div>
</template>

<script>
import HeaderModule from "../components/HeaderModuleComponent.vue";
import TabComponentEnsenanza from "../components/Ensenanza/TabComponentEnsenanza.vue";
import formEsenanza from "../components/Ensenanza/formEsenanza.vue";
import Multiselect from "vue-multiselect";
import apiEnsenanza from "../services/apiEnsenanza";

export default {
  data() {
    return {
      rfc: "",
      selMateria: null,
      materias: [],
    };
  },
  mounted() {
    const userData = JSON.parse(localStorage.getItem("user"));
    this.fetchMateriasByRFC(userData.rfc);
  },
  methods: {
    fetchMateriasByRFC(rfc) {
      if (!this.materias.length) {
        // Solo realiza la búsqueda si las materias están vacías
        this.isLoading = true;
        apiEnsenanza
          .buscarMaterias(rfc) // Debes tener un método similar en tu servicio API
          .then((res) => {
            this.materias = res.data;
            this.isLoading = false;
          })
          .catch((err) => {
            console.log("Error al buscar materias", err);
            this.isLoading = false;
          });
      }
    },
    actualizarContenido() {
      this.$store.commit("setSelectedMateria", this.selMateria.materia);
    },
  },
  components: {
    HeaderModule,
    TabComponentEnsenanza,
    formEsenanza,
    Multiselect,
  },
};
</script>
