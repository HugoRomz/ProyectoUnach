<template>
  <div class="container mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 m-8">
      <div v-for="card in cardsConPermiso" :key="card.title">
        <HomeList :card="card" />
      </div>
    </div>
  </div>
</template>

<script>
import HomeList from "../components/Home/CardsLink.vue";
import imgTutorias from "../assets/responsive-pc.jpeg";
import { mapGetters } from "vuex";

export default {
  components: {
    HomeList,
  },
  computed: {
    cardsConPermiso() {
      return this.cards.filter((card) =>
        this.tienePermiso(card.requiredPermission)
      );
    },
    ...mapGetters(["tienePermiso"]),
  },

  data() {
    return {
      cards: [
        {
          title: "Tutorias",
          img: imgTutorias,
          alt: "png-card-sitio-web",
          description:
          "Bienvenido al Módulo de Tutorías: Aquí puedes gestionar y participar en diversas actividades del Programa de Orientación Profesional (POP), incluyendo conferencias, talleres, y ferias de empleo. Este módulo te permite registrar eventos, controlar la asistencia, y emitir constancias, asegurando un seguimiento efectivo del desarrollo profesional de los estudiantes.",
          route: "/tutorias",
          requiredPermission: "Tutorias",
        },
        {
          title: "Enseñanza",
          img: imgTutorias,
          alt: "png-card-sitio-web",
          description:
          "Bienvenido al Módulo de Enseñanza: Este módulo te permite administrar y supervisar las actividades de enseñanza-aprendizaje. Incluye funciones para controlar información sobre docentes, materias, evaluaciones, y avance de contenidos, facilitando la gestión académica y la evaluación del rendimiento estudiantil en cada unidad académica.",
          route: "/ensenanza",
          requiredPermission: "Enseñanza",
        },
        {
          title: "Investigacion",
          img: imgTutorias,
          alt: "png-card-sitio-web",
          description:
          "Bienvenido al Módulo de Coordinación de Investigación: Este espacio está dedicado al registro y seguimiento de proyectos de investigación. Aquí podrás introducir y consultar información sobre proyectos en curso, incluyendo líderes de proyecto, colaboradores, fechas clave, recursos utilizados y resultados obtenidos, fomentando así la colaboración y el avance académico en la facultad.",
          route: "/investigacion",
          requiredPermission: "Investigacion",
        },
        {
          title: "Secretaria",
          img: imgTutorias,
          alt: "png-card-sitio-web",
          description:
          "Bienvenido al Módulo de Secretaría Académica: Esta plataforma está diseñada para gestionar y almacenar información detallada sobre los docentes y sus actividades académicas. Aquí podrás acceder y actualizar datos sobre formación académica, certificaciones, participación en congresos, cursos impartidos, y publicaciones, contribuyendo a un eficiente manejo de los recursos académicos.",
          route: "/",
          requiredPermission: "Secretaria",
        },
      ],
    };
  },
};
</script>
