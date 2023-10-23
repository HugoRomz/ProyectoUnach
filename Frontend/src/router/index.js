import { createRouter, createWebHistory } from "vue-router";
import ModulosView from "../views/ModulosView.vue";
import Home from "../views/Home.vue";
import TutoriasView from "../views/TutoriaView.vue";
import EnsenanzaView from "../views/EnsenanzaView.vue";
import asignarMateria from "../views/asignarMateria.vue"
import materia from "../views/materia.vue"
import Login from "../views/Login.vue";
import InvestigacionView from "../views/InvestigacionView.vue";
import NotFound from "../views/404.vue";

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
        meta: { title: "Tutorias" },
      },
      {
        path: "ensenanza",
        name: "Enseñanza",
        component: EnsenanzaView,
        meta: { title: "Enseñanza" },
      },
      {
        path: "/asignarMateria",
        name: "Asignar Materia",
        component: asignarMateria,
        meta: { title: "Asignacion de Materia" },
      },
      {
        path: "/materia",
        name: "Materia",
        component: materia,
        meta: { title: "Materias" },
      },
    ],
  },
  {
    path: "/investigacion",
    name: "Investigacion",
    component: InvestigacionView,
    meta: { title: "Coordinacion de Investigacion" },
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
  next();
});

export default router;
