<template>
  <div
    class="w-1/2 md:w-1/3 lg:w-64 fixed md:top-0 md:left-0 h-screen lg:block bg-primaryBlue dark:bg-[#2D3748] z-30 rounded-lg shadow-lg mx-2 my-2"
    :class="sideBarOpen ? '' : 'hidden'"
    id="main-nav"
  >
    <div
      class="w-full h-28 border-b border-blue-900 flex px-4 items-center mb-8"
    >
      <a href="/home">
        <img class="h-24" src="../../assets/unach.png" alt="Logo unach 2023" />
      </a>
    </div>
    <div class="mb-4 px-4">
      <!-- Administrador -->
      <p
        class="pl-4 text-sm font-semibold mb-1 uppercase text-white tracking-widest border-b border-gray-600"
        v-if="esSuperAdmin()"
      >
        Administrador
      </p>

      <router-link to="/agregarDocente" v-if="esSuperAdmin()">
        <div
          class="w-full flex items-center text-SecundaryGold h-10 pl-4 hover:bg-SecundaryGold rounded-lg cursor-pointer hover:text-white"
        >
          <i class="pi pi-user text-2xl fill-current mr-2"></i>
          <span class="text-white">Usuarios</span>
        </div>
      </router-link>
    </div>
    <div class="mb-4 px-4">
      <!-- ENSEÑANZA -->
      <p
        class="pl-4 text-sm font-semibold mb-1 uppercase text-white tracking-widest border-b border-gray-600"
        v-if="tienePermiso('Enseñanza') || esAdminDeModulo('Enseñanza')"
      >
        Enseñanza
      </p>
      <router-link
        to="/ensenanza"
        v-if="tienePermiso('Enseñanza') || esAdminDeModulo('Enseñanza')"
      >
        <div
          class="w-full flex items-center text-SecundaryGold h-10 pl-4 hover:bg-SecundaryGold rounded-lg cursor-pointer hover:text-white"
        >
          <i class="pi pi-folder-open text-2xl fill-current mr-2"></i>
          <span class="text-white">Actividades</span>
        </div>
      </router-link>
      <router-link to="/agregarMateria" v-if="esAdminDeModulo('Enseñanza')">
        <div
          class="w-full flex items-center text-SecundaryGold h-10 pl-4 hover:bg-SecundaryGold rounded-lg cursor-pointer hover:text-white"
        >
          <i class="pi pi-book text-2xl fill-current mr-2"></i>
          <span class="text-white">Materias</span>
        </div>
      </router-link>
      <router-link to="/agregarDocente" v-if="esAdminDeModulo('Enseñanza')">
        <div
          class="w-full flex items-center text-SecundaryGold h-10 pl-4 hover:bg-SecundaryGold rounded-lg cursor-pointer hover:text-white"
        >
          <i class="pi pi-user text-2xl fill-current mr-2"></i>
          <span class="text-white">Docentes</span>
        </div>
      </router-link>
      <router-link to="/asignarMateria" v-if="esAdminDeModulo('Enseñanza')">
        <div
          class="w-full flex items-center text-SecundaryGold h-10 pl-4 hover:bg-SecundaryGold rounded-lg cursor-pointer hover:text-white"
        >
          <i class="pi pi-id-card text-2xl fill-current mr-2"></i>
          <span class="text-white">Asignar Materias</span>
        </div>
      </router-link>
    </div>
    <!-- TUTORIAS -->
    <div class="mb-4 px-4">
      <p
        class="pl-4 text-sm font-semibold mb-1 uppercase text-white tracking-widest border-b border-gray-600"
        v-if="tienePermiso('Tutorias') || esAdminDeModulo('Tutorias')"
      >
        Tutorias
      </p>
      <router-link to="/tutorias" v-if="tienePermiso('Tutorias')">
        <div
          class="w-full flex items-center text-SecundaryGold h-10 pl-4 hover:bg-SecundaryGold rounded-lg cursor-pointer hover:text-white"
        >
          <i class="pi pi-folder-open text-2xl fill-current mr-2"></i>
          <span class="text-white">Actividades</span>
        </div>
      </router-link>
    </div>
    <div class="mb-4 px-4">
      <p
        class="pl-4 text-sm font-semibold mb-1 uppercase text-white tracking-widest border-b border-gray-600"
        v-if="tienePermiso('Investigacion')"
      >
        Investigación
      </p>

      <router-link to="/investigacion" v-if="tienePermiso('Investigacion')">
        <div
          class="w-full flex items-center text-SecundaryGold h-10 pl-4 hover:bg-SecundaryGold rounded-lg cursor-pointer hover:text-white"
        >
          <i class="pi pi-folder-open text-2xl fill-current mr-2"></i>
          <span class="text-white">Actividades</span>
        </div>
      </router-link>
      <router-link
        to="/reportesInvestigacion"
        v-if="tienePermiso('Investigacion')"
      >
        <div
          class="w-full flex items-center text-SecundaryGold h-10 pl-4 hover:bg-SecundaryGold rounded-lg cursor-pointer hover:text-white"
        >
          <i class="pi pi-book text-2xl fill-current mr-2"></i>
          <span class="text-white">Reportes</span>
        </div>
      </router-link>
    </div>
    <div class="mb-4 px-4">
      <p
        class="pl-4 text-sm font-semibold mb-1 uppercase text-white tracking-widest border-b border-gray-600"
        v-if="tienePermiso('Secretaria')"
      >
        Secretaria
      </p>
      <router-link to="/secretaria" v-if="tienePermiso('Secretaria')">
        <div
          class="w-full flex items-center text-SecundaryGold h-10 pl-4 hover:bg-SecundaryGold rounded-lg cursor-pointer hover:text-white"
        >
          <i class="pi pi-folder-open text-2xl fill-current mr-2"></i>
          <span class="text-white">Actividades</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "Sidebar",
  computed: {
    ...mapState(["sideBarOpen"]),
    ...mapGetters(["tienePermiso"]),
    esAdminDeModulo() {
      return (modulo) => {
        return (
          this.tienePermiso(`${modulo}-Admin`) ||
          this.tienePermiso("Super-Admin")
        );
      };
    },
  },
  methods: {
    esSuperAdmin() {
      return this.tienePermiso("Super-Admin");
    },
  },
};
</script>
