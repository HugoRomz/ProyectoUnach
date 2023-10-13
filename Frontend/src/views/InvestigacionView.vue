<template>
    <div class="container mx-auto">
    <HeaderComponent
      titulo="Coordinacion de Investigación"
      ciclo="AGTO - DIC 2023"
    />
    <div class="w-full bg-white shadow-xl border rounded-lg border-gray-300 mb-7">
      <button
        @click="showModal = true"
        class="bg-blue-500 text-white font-bold p-2 rounded m-4"
      >
        Registrar Proyecto
      </button>
      <TabProyectosInvestigacion ref="datatableComponent" />
    </div>
  </div>
</template>

<script>
import HeaderComponent from "../components/HeaderModuleComponent.vue";
import TabProyectosInvestigacion from "../components/Investigacion/TabProyectosInvestigacion.vue"

export default{
    components:{
        HeaderComponent,
        TabProyectosInvestigacion
    },
    data(){

    },
    methods:{
        handleClose(value) {
            this.showModal = value;
        },
        fetchActivities() {
            this.$refs.datatableComponent.updateData();
        },
    }
}

</script>