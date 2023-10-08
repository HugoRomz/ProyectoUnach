
<template>
  <div id="app">
    <Navbar />
    <router-view></router-view>
    <!-- Pie de página u otros elementos comunes pueden ir aquí -->
    <footerVue />
  </div>
</template>

<script>
import Navbar from './components/Layouts/navbar.vue'; // Ajusta la ruta según tu estructura de archivos
import footerVue from './components/Layouts/footer.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    footerVue
  }
}
</script>