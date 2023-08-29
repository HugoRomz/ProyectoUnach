<template>
    <header class="bg-primaryBlue">
        <div class="flex flex-col lg:flex-row container mx-auto items-center ">
            <div class="mt-2 mb-4">
                <img class=" lg:w-3/6 w-11/12 lg:m-0" src="../../assets/unach.jpg" alt="Logo unach 2023">
            </div>
            <!-- <div class="flex flex-col items-center justify-center mb-5">
                <div class="font-bold text-white">
                    <a href="#" class="mx-1">Spanish |</a>
                    <a href="#" class="mx-1">English |</a>
                    <a href="#" class="mx-1">French</a>
                </div>
                <div class="text-white text-sm font-bold">
                    <a href="#" class="mx-2">Loho</a>
                    <a href="#" class="mx-2">Loto</a>
                    <a href="#" class="mx-2">Logo</a>
                </div>
            </div>         -->
        </div>
    </header>
    <nav class="bg-SecundaryGold">
      <div class="flex flex-wrap items-center justify-between py-1 md:py-0 pl-2 text-lg mx-auto container mb-4">
      <div></div>
      <span
        id="menu-button"
        class="h-6 w-6 cursor-pointer md:hidden block text-white text-xl"
        @click="toggleMenu"
      >
        <i class="pi pi-bars"></i>
      </span>

      <div :class="{ hidden: !showMenu, 'md:block': showMenu }" class="w-full md:flex md:items-center md:w-auto" id="menu">
  <ul class="pt-1 pb-1 text-lg md:flex md:justify-between md:pt-0 w-full">
    <li v-for="item in menuItems" :key="item.text">
      <router-link :to="item.route" class="md:p-4 py-2 block md:hover:bg-primaryBlue text-white font-bold">{{ item.text }}</router-link>
    </li>
  </ul>
</div>

    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
    data() {
    return {
      showMenu: false,
      menuItems: [
        { text: 'Home', route: '/' },
        { text: 'Tutorias', route: '/tutorias' },
        { text: 'Ensenanza', route: '/ensenanza' },
        { text: 'Features', route: '#features4' },
        { text: 'Features', route: '#features5' }
      ]
    };
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    }
  }
};
</script>