<template>
  <div class="h-12 inline-block mb-14">
    <h2 class="text-base md:text-4xl text-gray-800 dark:text-gray-300 uppercase">
      Módulo: <span class="font-bold">{{ titulo }}</span>
    </h2>
    <div class="flex mb-4">
      <div class="w-1/2 h-12">
        <p class="text-[10px] md:text-lg text-gray-800 dark:text-gray-300 uppercase">
          Ciclo escolar: <strong class="font-bold text-yellow-400">{{ cicloEscolar }}</strong>
        </p>
      </div>
      <div class="w-1/2 h-12 text-right">
        <p class="text-[10px] md:text-lg text-gray-800 dark:text-gray-300 uppercase">
          Facultad de Negocios
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titulo: {
      type: String,
      required: true,
    },
  },
  computed: {
    cicloEscolar() {
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1; // getMonth() devuelve 0-11

      if (currentMonth >= 1 && currentMonth <= 6) {
        return `Ene - Jun ${currentYear}`;
      } else {
        return `Ago - Dic ${currentYear}`;
      }
    },
  },
};
</script>
