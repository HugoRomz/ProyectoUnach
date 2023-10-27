import { createRouter, createWebHistory } from "vue-router";
import ModulosView from "../views/ModulosView.vue";
import Home from "../views/Home.vue";
import TutoriasView from "../views/TutoriaView.vue";
import EnsenanzaView from "../views/EnsenanzaView.vue";
import asignarMateria from "../views/asignarMateria.vue"
import Login from "../views/Login.vue";
import InvestigacionView from "../views/InvestigacionView.vue";
import agregarMateria from "../components/Ensenanza/agregarMateria.vue"
import agregarDocente from "../components/Ensenanza/agregarDocente.vue"
import NotFound from "../views/404.vue";
import NoPermisos from "../views/noPermisos.vue";


const routes = [
  {
    path: "/",
    component: Home,
    meta: { requiresAuth: true }, // Aquí
    children: [
      { path: "", redirect: { name: "home" } },
      {
        path: "home",
        name: "home",
        component: ModulosView,
        meta: { title: "Sistema de Gestión de Actividades" },
      },
      {
        path: "tutorias",
        name: "Tutorias",
        component: TutoriasView,
        meta: { title: "Tutorias", requiredPermission: 'Tutorias' }, 
      },
      {
        path: "ensenanza",
        name: "Enseñanza",
        component: EnsenanzaView,
        meta: { title: "Enseñanza", requiredPermission: 'Enseñanza'  },
      },
      {
        path: "/asignarMateria",
        name: "Asignar Materia",
        component: asignarMateria,
        meta: { title: "Asignacion de Materia", requiredPermission: 'Enseñanza-Admin'},
      },
      {
        path: "/agregarDocente",
        name: "Agregar Docente",
        component: agregarDocente,
        meta: { title: "Agregar Docente" ,requiredPermission: 'Enseñanza-Admin'},
      },
      {
        path: "/agregarMateria",
        name: "Agregar Materia",
        component: agregarMateria,
        meta: { title: "Agregar Materia",requiredPermission: 'Enseñanza-Admin' },
      },
    ],
  },
  {
    path: "/investigacion",
    name: "Investigacion",
    component: InvestigacionView,
    meta: { title: "Coordinacion de Investigacion",requiredPermission: 'Investigacion' },
  },
  {
    path: "/Login",
    name: "Login",
    component: Login,
    meta: { title: "Login" },
  },
  {
    path: "/404",
    name: "NotFound",
    component: NotFound,
    meta: { title: "404 Not Found" },
  },
  {
    path: "/no-permisos",
    name: "NoPermisos",
    component: NoPermisos,
    meta: { title: "No Tienes Permisos" },
},
  {
    path: "/:pathMatch(.*)*",
    redirect: { name: "NotFound" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

function isAuthenticated() {
  return !!localStorage.getItem("user");
};

function hasPermission(requiredPermission) {
  const userPermissionsObject = JSON.parse(localStorage.getItem("permisos"));

  if (!userPermissionsObject || !userPermissionsObject.data || !Array.isArray(userPermissionsObject.data.permisos)) {
      return false;  // Si no es un array o no existe, directamente retornamos false.
  }

  const userPermissions = userPermissionsObject.data.permisos;

  // Si es superadmin, permite el acceso a cualquier ruta
  if (userPermissions.some(permission => permission.Permiso === "Super-Admin")) {
      return true;
  }

  return userPermissions.some(permission => permission.Permiso === requiredPermission);
}


router.beforeEach((to, from, next) => {
  // Set the document title based on route metadata
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = "Mi aplicación Vue";
  }

  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !isAuthenticated()
  ) {
    next("/Login");
    return;
  }

  if (to.path.toLowerCase() === "/login" && isAuthenticated()) {
    next("/home");
    return;
  }

  const requiredPermission = to.meta.requiredPermission;
  if (requiredPermission && !hasPermission(requiredPermission)) {
    next("/no-permisos");  
    return;
  }

  next();
});


export default router;
