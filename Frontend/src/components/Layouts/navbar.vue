<template>
  <div class="sticky top-0 z-40">
    <div
      class="w-full h-20 px-6 bg-SecundaryGold border-b flex items-center justify-between"
    >
      <!-- left navbar -->
      <div class="flex">
        <!-- mobile hamburger -->
        <div class="lg:hidden flex items-center mr-4">
          <button
            class="hover:text-blue-500 hover:border-white focus:outline-none navbar-burger"
            @click="toggleSidebar()"
          >
            <svg
              class="h-5 w-5"
              v-bind:style="{ fill: 'black' }"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
      </div>

      <!-- right navbar -->
      <div class="flex items-center relative">
        <img
          src="../../assets/profile.svg"
          class="w-12 h-12 rounded-full shadow-lg"
          @click="dropDownOpen = !dropDownOpen"
        />
      </div>
    </div>

    <!-- dropdown menu -->
    <div
      class="absolute bg-gray-100 border border-t-0 shadow-xl text-gray-700 rounded-b-lg w-48 top-full right-0 mr-6"
      :class="dropDownOpen ? '' : 'hidden'"
    >
      <button
        @click="showAccountModal"
        class="w-full block px-4 py-2 hover:bg-gray-200"
      >
        Cuenta
      </button>
      <button
        @click="handleLogout"
        class="w-full block px-4 py-2 hover:bg-gray-200"
      >
        Logout
      </button>
    </div>
    <!-- dropdown menu end -->
    <!-- Modal usuario -->
    <div
      v-if="showModal"
      class="fixed z-50 top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center"
      @click="showModal = false"
    >
      <!-- Perfil -->
      <div
        class="mx-auto my-10 bg-white rounded-lg shadow-lg p-5 w-2/3 lg:w-1/3 q"
        @click.stop
      >
        <img
          class="w-32 h-32 rounded-full mx-auto"
          src="../../assets/profile.svg"
          alt="Perfil"
        />
        <div class="mt-2 text-center">
          <p class="text-gray-600 mt-1">Nombre</p>
          <h3 class="text-xl font-semibold">{{user.nombre_Doce + " " + user.apellido_paterno + " " + user.apellido_materno}}</h3>
          <p class="text-gray-600 mt-1">RFC:</p>
          <h3 class="text-xl font-semibold">{{ user.rfc }}</h3>
          <p class="text-gray-600 mt-1">Numero de Plaza</p>
          <h3 class="text-xl font-semibold">{{ user.n_plaza }}</h3>
        </div>
        
        <!-- Botón de cierre -->
        <div class="mt-4 flex justify-end">
          <button
            @click="showModal = false"
            class="bg-gray-200 px-4 py-2 rounded"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { logout } from "../../services/authServices";
export default {
  name: "Navbar",
  computed: {
    ...mapState(["sideBarOpen", "user"]),
  },
  data() {
    return {
      dropDownOpen: false,
      showModal: false,
    };
  },
  methods: {
    showAccountModal() {
      this.showModal = true;
    },
    toggleSidebar() {
      this.$store.dispatch("toggleSidebar");
    },
    handleLogout() {
      logout();
      this.$router.push("/login"); // Redirigir al usuario a la página de inicio de sesión después de cerrar sesión.
    },
  },
};
</script>
