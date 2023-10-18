<template>
  <!-- give the sidebar z-50 class so its higher than the navbar if you want to see the logo -->
  <!-- you will need to add a little "X" button next to the logo in order to close it though -->
  <div
    class="w-1/2 md:w-1/3 lg:w-64 fixed md:top-0 md:left-0 h-screen lg:block bg-primaryBlue  z-30"
    :class="sideBarOpen ? '' : 'hidden'"
    id="main-nav"
  >
    <div class="w-full h-20 border-b border-blue-900 flex px-4 items-center mb-8">
      <!-- <p class="font-semibold text-3xl text-blue-400 pl-4">LOGO</p> -->
      <img class=" " src="../../assets/unach.png" alt="Logo unach 2023" />
    </div>

    <div class="mb-4 px-4">
      <p class="pl-4 text-sm font-semibold mb-1 uppercase text-white tracking-widest border-b border-gray-600">Enseñanza</p>
      <router-link to="/ensenanza">
        <div
          class="w-full flex items-center text-SecundaryGold h-10 pl-4 hover:bg-SecundaryGold rounded-lg cursor-pointer hover:text-white"
        >
          <i class="pi pi-home text-2xl fill-current mr-2"></i>
          <span class="text-white">Dashboard</span>
        </div>
      </router-link>
    </div>
    <div class="mb-4 px-4">
      <p class="pl-4 text-sm font-semibold mb-1 uppercase text-white tracking-widest border-b border-gray-600">Tutorias</p>
      <router-link to="/ensenanza">
        <div
          class="w-full flex items-center text-SecundaryGold h-10 pl-4 hover:bg-SecundaryGold rounded-lg cursor-pointer hover:text-white"
        >
          <i class="pi pi-home text-2xl fill-current mr-2"></i>
          <span class="text-gray-300">Dashboard</span>
        </div>
      </router-link>
    </div>
    <div class="mb-4 px-4">
      <p class="pl-4 text-sm font-semibold mb-1 uppercase text-white tracking-widest border-b border-gray-600">Investigación</p>
      <router-link to="/ensenanza">
        <div
          class="w-full flex items-center text-SecundaryGold h-10 pl-4 hover:bg-SecundaryGold rounded-lg cursor-pointer hover:text-white"
        >
          <i class="pi pi-home text-2xl fill-current mr-2"></i>
          <span class="text-gray-300">Dashboard</span>
        </div>
      </router-link>
    </div>
    <div class="mb-4 px-4">
      <p class="pl-4 text-sm font-semibold mb-1 uppercase text-white tracking-widest border-b border-gray-600">Secretaria</p>
      <router-link to="/ensenanza">
        <div
          class="w-full flex items-center text-SecundaryGold h-10 pl-4 hover:bg-SecundaryGold rounded-lg cursor-pointer hover:text-white"
        >
          <i class="pi pi-home text-2xl fill-current mr-2"></i>
          <span class="text-gray-300">Dashboard</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Sidebar",
  computed: {
    ...mapState(["sideBarOpen"]),
  },
};
</script>
