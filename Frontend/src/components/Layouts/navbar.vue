<template>
  <nav class="bg-SecundaryGold">
    <div
      class="flex flex-wrap items-center justify-between md:py-0 text-lg mx-auto mb-6 container"
    >
      <div></div>
      <span
        id="menu-button"
        class="h-6 w-6 cursor-pointer md:hidden block text-white text-xl m-3"
        @click="toggleMenu"
      >
        <i class="pi pi-bars"></i>
      </span>

      <div
        :class="{ hidden: !showMenu, 'md:block': showMenu }"
        class="w-full md:flex md:items-center md:w-auto"
        id="menu"
      >
        <ul class="text-lg md:flex md:justify-between md:pt-0 w-full">
          <li v-for="item in menuItems" :key="item.text">
            <router-link
              :to="item.route"
              class="md:p-4 py-2 pl-2 block md:hover:bg-primaryBlue text-white font-bold hover:bg-primaryBlue"
              >{{ item.text }}</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      showMenu: false,
      menuItems: [
        { text: "Home", route: "/" },
        { text: "Tutorias", route: "/tutorias" },
        { text: "Ensenanza", route: "/ensenanza" },
        { text: "Features", route: "#features4" },
        { text: "Features", route: "#features5" },
      ],
    };
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
  },
};
</script>
