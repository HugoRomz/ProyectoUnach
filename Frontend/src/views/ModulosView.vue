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
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown",
          route: "/tutorias",
          requiredPermission: "Tutorias",
        },
        {
          title: "Enseñanza",
          img: imgTutorias,
          alt: "png-card-sitio-web",
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown",
          route: "/ensenanza",
          requiredPermission: "Enseñanza",
        },
        {
          title: "Investigacion",
          img: imgTutorias,
          alt: "png-card-sitio-web",
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown",
          route: "/investigacion",
          requiredPermission: "Investigacion",
        },
        {
          title: "Otro no recuerdo",
          img: imgTutorias,
          alt: "png-card-sitio-web",
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown",
          route: "/",
          requiredPermission: "Secretaria",
        },
      ],
    };
  },
};
</script>
