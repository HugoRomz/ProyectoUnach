
<template>
  <div id="app">
    <Headerview v-if="showHeader"/>
    <Navbar v-if="showNavbar"/>

    <router-view></router-view>
    <!-- Pie de página u otros elementos comunes pueden ir aquí -->
    <footerVue v-if="showHeader"/>
  </div>
</template>

<script>
import Headerview from './components/Layouts/header.vue'; // Ajusta la ruta según tu estructura de archivos
import footerVue from './components/Layouts/footer.vue';
import Navbar from './components/Layouts/navbar.vue';

export default {
  name: 'App',
  components: {
    Headerview,
    footerVue,
    Navbar
  },
  computed: {
    showNavbar() {
      // No mostrar Navbar si la ruta actual es 'Home'
      return this.$route.name !== 'Home' && this.$route.name !== 'LoginEnsenanza';

    },
    showHeader() {
      // No mostrar Navbar si la ruta actual es 'Home'
      return this.$route.name !== 'LoginEnsenanza';

    }
  }
}
</script>