<template>
    <div class="h-12 inline-block mb-14">
      <h2 class="text-base md:text-4xl text-primaryBlue uppercase">
        Módulo: <span class="font-bold">{{ titulo }}</span>
      </h2>
      <div class="flex mb-4">
        <div class="w-1/2 h-12">
          <p class="text-[10px] md:text-lg text-primaryBlue uppercase">
            Ciclo escolar: <strong class="font-bold text-SecundaryGold">{{ ciclo }}</strong>
          </p>
        </div>
        <div class="w-1/2 h-12 text-right">
          <p class="text-[10px] md:text-lg text-primaryBlue uppercase">Facultad de Negocios</p>
        </div>
      </div>
    </div>
  </template>

<script>
export default {
  props: {
    titulo: {
      type: String,
      required: true
    },
    ciclo: {
      type: String,
      required: true
    }
  }
}
</script>