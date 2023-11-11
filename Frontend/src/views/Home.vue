<template>
    <div class="leading-normal tracking-normal" id="main-body">
      <div class="flex flex-wrap">
  
        <Sidebar />
  
        <div class="w-full bg-gray-100 dark:bg-darkBackground  pl-0 lg:pl-64 min-h-screen" :class="sideBarOpen ? 'overlay' : ''" id="main-content">
  
          <Navbar />
  
          <div class="p-6 bg-gray-100 dark:bg-darkBackground mb-20">
            <router-view />
          </div>
  
          <Footer />
  
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex'
  
  import Sidebar from '../components/Layouts/sidebar.vue'
  import Navbar from '../components/Layouts/navbar.vue'
  import Footer from '../components/Layouts/footer.vue'
  
  export default {
    name: 'Home',
    computed: {
      ...mapState(['sideBarOpen'])
    },
  
    components: {
      Sidebar,
      Navbar,
      Footer
    }
  }
  </script>