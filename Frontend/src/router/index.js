import { createRouter, createWebHistory } from 'vue-router';
import ListaArticulos from '../components/ProductList.vue'; // Ajusta la ruta según tu estructura

const routes = [
  {
    path: '/',
    name: 'ListaArticulos',
    component: ListaArticulos
  }
  
  // Agrega más rutas aquí si es necesario
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;