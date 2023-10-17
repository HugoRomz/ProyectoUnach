import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomeView.vue";
import TutoriasView from "../views/TutoriaView.vue";
import EnsenanzaView from "../views/Ensenanza/EnsenanzaView.vue";
import loginEnsenanza from "../views/Ensenanza/loginEnsenanza.vue";
import InvestigacionView from "../views/InvestigacionView.vue";
import Dashboard from "../views/Dashboard.vue";
import DashboardHome from "../views/Home.vue";

const routes = [
  {
    path: "/",
    component: Dashboard,
    children: [
      { path: "", redirect: { name: "DashboardHome" } },
      { path: "home", name: "DashboardHome", component: DashboardHome },
      {
        path: "/tutorias",
        name: "Tutorias",
        component: TutoriasView,
        meta: { title: "Tutorias" },
      },
    ],
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: { title: "Sistema de Gestión de Actividades" },
  },

  {
    path: "/ensenanza",
    name: "Enseñanza",
    component: EnsenanzaView,
    meta: { title: "Enseñanza" },
  },
  {
    path: "/loginEnsenanza",
    name: "LoginEnsenanza",
    component: loginEnsenanza,
    meta: { title: "LoginEnsenanza" },
  },
  {
    path: "/investigacion",
    name: "Investigacion",
    component: InvestigacionView,
    meta: { title: "Coordinacion de Investigacion" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // Set the document title based on route metadata
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = "Mi aplicación Vue";
  }
  next();
});

export default router;
