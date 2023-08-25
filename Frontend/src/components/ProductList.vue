<template>
  <Navbar />

  <div class="container mx-auto">
    <div class="mt-8 flex flex-wrap space-x-0 space-y-2 md:space-x-4 md:space-y-0">
      <!-- Primer contenedor -->
      <!-- Sección 1 - Gráfica de Usuarios -->
      <div class="flex-1 bg-white p-4 shadow-xl border rounded-lg md:w-1/2">
        <h2 class=" text-primaryBlue text-lg font-bold pb-1">Tabla de Prueba</h2>
        <div class="my-1"></div> <!-- Espacio de separación -->
        <div class="bg-gradient-to-r from-yellow-300 to-yellow-500 h-px mb-6"></div>
        <div class="h-auto">
          <div class="flex bg-white p-4 shadow-xl border rounded-lg ">
            <table class="w-full h-auto text-sm text-left text-gray-500 rounded-xl">
            <thead class="text-xs text-gray-700 uppercase bg-gray-100 ">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Id
                </th>
                <th scope="col" class="px-6 py-3">
                  Articulo
                </th>
                <th scope="col" class="px-6 py-3">
                  Precio
                </th>
                <th scope="col" class="px-6 py-3">
                  Stock
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b" v-for="(articulo, index) in articulos" :key="index">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {{ articulo.id }}
                </th>
                <td class="px-6 py-4">
                  {{ articulo.descripcion }}
                </td>
                <td class="px-6 py-4">
                  {{ articulo.precio }}
                </td>
                <td class="px-6 py-4">
                  {{ articulo.stock }}
                </td>
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
  import api from '../services/api';
  import Navbar from './navbar.vue';

  export default {
    data() {
      return {
        articulos: []
      };
    },
    mounted() {
      this.obtenerArticulos();
    },
    methods: {
      obtenerArticulos() {
        api.obtenerArticulos()
          .then(response => {
            this.articulos = response.data;
          })
          .catch(error => {
            console.error('Error al obtener los artículos:', error);
          });
      }
    },
    components: {
      Navbar
    }
  };
</script>

<style>
  /* Agrega estilos de Tailwind CSS aquí si lo deseas */
</style>