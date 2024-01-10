<template>
    <div class="sticky top-2 z-40 mx-2 md:mx-4 my-2">
    <div
      class="w-full h-20 px-6 py-3 bg-SecundaryGold dark:bg-[#2D3748] border-b flex items-center justify-between rounded-lg border-none"
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
        <!-- <button @click="toggleDarkMode" class="mr-8 text-xl">
          <i
            :class="
              isDarkMode
                ? 'pi pi-sun text-white'
                : 'pi pi-moon text-white'
            "
          ></i>
        </button> -->

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
      <div class="max-w-xs" @click.stop>
        <div class="bg-white shadow-xl rounded-lg py-3">
          <div class="photo-wrapper p-2">
            <img
              class="w-32 h-32 rounded-full mx-auto"
              src="../../assets/profile.svg"
              alt="User Profile"
            />
          </div>
          <div class="p-10">
            <h3
              class="text-center text-3xl text-gray-900 font-medium leading-8"
            >
              {{ user.nombre_Doce + " " + user.apellido_paterno }}
            </h3>
            <div
              class="text-center text-gray-400 text-sm font-semibold"
              v-for="(item, index) in permisos"
              :key="index"
            >
              <p>{{ item.Permiso }}</p>
            </div>
            <table class="text-lg my-3">
              <tbody>
                <tr>
                  <td class="px-2 py-2 text-gray-500 font-semibold">RFC</td>
                  <td class="px-2 py-2">{{ user.rfc }}</td>
                </tr>
                <tr>
                  <td class="px-2 py-2 text-gray-500 font-semibold">N_Plaza</td>
                  <td class="px-2 py-2">{{ user.n_plaza }}</td>
                </tr>
                <tr>
                  <td class="px-2 py-2 text-gray-500 font-semibold">Sexo</td>
                  <td class="px-2 py-2">{{ user.sexo }}</td>
                </tr>
              </tbody>
            </table>
          </div>
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
    ...mapState(["sideBarOpen", "user", "permisos"]),
  },
  data() {
    return {
      isDarkMode: localStorage.getItem("darkMode") === "false",
      dropDownOpen: false,
      showModal: false,
    };
  },
  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode; // Reactividad
      localStorage.setItem("darkMode", this.isDarkMode);

      if (this.isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
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
