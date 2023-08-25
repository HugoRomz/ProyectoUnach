<template >
    <header class="bg-primaryBlue ">
        <div class="flex flex-col lg:flex-row lg:max-w-7xl lg:mx-auto items-center ">
            <div class="mt-2 mb-4">
                <img class="lg:w-3/6 w-11/12 m-auto lg:m-0" src="../assets/unach.jpg" alt="Logo unach 2023">
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
    <nav class=" bg-SecundaryGold text-white">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center">
          <div class="text-xl font-semibold">
            MiSitio
          </div>
          <div class="hidden md:flex space-x-4">
            <a href="#" class="hover:bg-primaryBlue px-3 py-2 rounded">Inicio</a>
            <div @mouseover="showSubList = true" @mouseout="showSubList = false" class="relative group">
              <a href="#" class="hover:bg-primaryBlue px-3 py-2 rounded">Sublista</a>
              <div v-if="showSubList" class="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white text-black z-10">
                <a href="#" class="block px-4 py-2 hover:bg-blue-500 hover:text-white">Sublink 1</a>
                <a href="#" class="block px-4 py-2 hover:bg-blue-500 hover:text-white">Sublink 2</a>
              </div>
            </div>
            <a href="#" class="hover:bg-primaryBlue px-3 py-2 rounded">Contacto</a>
          </div>
          <div class="md:hidden flex items-center">
            <button @click="isOpen = !isOpen">
              <i class="fas fa-bars"></i>
            </button>
          </div>
        </div>
      </div>
      <div v-if="isOpen" class="block md:hidden">
        <a href="#" class="block hover:bg-primaryBlue px-4 py-2">Inicio</a>
        <a href="#" class="block hover:bg-primaryBlue px-4 py-2">Sublista</a>
        <div v-if="showSubList" class="px-4 py-2">
          <a href="#" class="block hover:bg-primaryBlue">Sublink 1</a>
          <a href="#" class="block hover:bg-primaryBlue">Sublink 2</a>
        </div>
        <a href="#" class="block hover:bg-primaryBlue px-4 py-2">Contacto</a>
      </div>
    </nav>
</template>
<script>
export default {
  data() {
    return {
      isOpen: false,
      showSubList: false
    };
  }
};
</script>