<template>
  <Navbar />
  <div class="container mx-auto py-4">
    <div class="relative bg-slate-500">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="(articulo, index) in articulos"
            :key="index">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
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
    components: { Navbar }
};
</script>

<style>
  /* Agrega estilos de Tailwind CSS aquí si lo deseas */
</style>