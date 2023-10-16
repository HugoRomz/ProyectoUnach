import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue'; 
import TutoriasView from '../views/TutoriaView.vue';
import EnsenanzaView from '../views/Ensenanza/EnsenanzaView.vue';
import loginEnsenanza from '../views/Ensenanza/loginEnsenanza.vue';
import InvestigacionView from '../views/InvestigacionView.vue'

// Ajusta la ruta según tu estructura

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'Sistema de Gestión de Actividades' }
  },
  {
    path: '/tutorias',
    name: 'Tutorias',
    component: TutoriasView,
    meta: { title: 'Tutorias' }
  }
  ,
  {
    path: '/ensenanza',
    name: 'Enseñanza',
    component: EnsenanzaView,
    meta: { title: 'Enseñanza' }
  },
  {
    path: '/loginEnsenanza',
    name: 'LoginEnsenanza',
    component: loginEnsenanza,
    meta: { title: 'LoginEnsenanza' 
   },

    path: '/investigacion',
    name: 'Investigacion',
    component: InvestigacionView,
    meta: { title: 'Coordinacion de Investigacion' }
  }
  
  // Agrega más rutas aquí si es necesario
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
  // Si la ruta tiene un título definido en meta.title, úsalo
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  } else {
    // Si no, puedes poner un título por defecto
    document.title = 'Mi aplicación Vue';
  }
  next();
});

export default router;