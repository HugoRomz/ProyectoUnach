import { createRouter, createWebHistory } from 'vue-router';
import ListaArticulos from '../components/ProductList.vue'; 
import TutoriasHome from '../components/tutorias.vue'
// Ajusta la ruta según tu estructura

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ListaArticulos,
    meta: { title: 'Sistema de Gestión de Actividades' }
  },
  {
    path: '/tutorias',
    name: 'Tutorias',
    component: TutoriasHome,
    meta: { title: 'Tutorias' }
  }
  ,
  {
    path: '/ensenanza',
    name: 'Enseñanza',
    component: TutoriasHome,
    meta: { title: 'Enseñanza' }
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