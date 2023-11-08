<template>
  <section class="flex flex-col md:flex-row h-screen items-center">
    <div
      class="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center"
    >
      <div class="w-full h-100">
        <div class=" text-black">
          <img
            src="../assets/logounach.svg"
            class="h-56 mx-auto mt-10 fill-current"
          />
        </div>
        <div
          class="my-5 mt-10 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300"
        >
          <p
            class="mx-4 mb-0 text-center font-semibold text-slate-600 uppercase tracking-widest text-2xl"
          >
            SIGEA
          </p>
        </div>

        <form class="mt-6" @submit.prevent="login" method="POST">
          <div>
            <label class="block text-gray-700" for="rfc">Rfc</label>
            <input
              class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-SecundaryGold focus:bg-white focus:outline-none"
              autofocus
              type="text"
              placeholder="RFC"
              id="rfc"
              v-model="rfc"
            />
          </div>

          <div class="mt-4">
            <label class="block text-gray-700" for="password">Contraseña</label>
            <input
              class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-SecundaryGold focus:bg-white focus:outline-none"
              type="password"
              placeholder="Contraseña"
              id="password"
              v-model="password"
            />
          </div>

          <div class="text-right mt-2">
            <a
              href="#"
              class="text-sm font-semibold text-gray-700 hover:text-SecundaryGold focus:text-blue-700"
              >¿Olvidaste tu contraseña?</a
            >
          </div>

          <button
            type="submit"
            class="w-full block bg-primaryBlue hover:bg-blue-800 focus:bg-blue-700 text-white font-semibold rounded-lg px-4 py-3 mt-6"
          >
            Iniciar Sesión
          </button>
        </form>

        <hr class="my-6 border-gray-300 w-full" />

        <p class="mt-8">
          ¿No tienes una cuenta?
          <a
            href="#"
            class="text-primaryBlue hover:text-SecundaryGold font-semibold"
          >
            Solicita tu cuenta al administrador
          </a>
        </p>

        <p class="text-sm text-gray-500 mt-12">
          &copy; 2023 UNACH - Todos los derechos reversados.
        </p>
      </div>
    </div>
    <div class="bg-blue-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
      <img
        src="../assets/fondo.jpg"
        alt=""
        class="w-full h-full object-cover brightness-75"
      />
    </div>
  </section>
</template>
<script>
import { login, getPermisos } from "../services/authServices";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      rfc: "",
      password: "",
    };
  },
  watch: {
    rfc(value) {
      this.rfc = value.toUpperCase();
    },
  },
  methods: {
    isValidRFC(rfc) {
      // Ejemplo simple de validación de RFC
      const rfcPattern = /^[A-Z]{3,4}[0-9]{6}[A-Z0-9]{3}$/;
      return rfcPattern.test(rfc);
    },

    async login() {
      // Validación: RFC no debe estar vacío y debe ser válido
      if (!this.rfc || !this.isValidRFC(this.rfc)) {
        Swal.fire({
          position: "top",
          icon: "warning",
          title: "Por favor, introduce un RFC válido.",
          showConfirmButton: false,
          timer: 1000,
        });
        return;
      }

      // Validación: Contraseña no debe estar vacía
      if (!this.password) {
        Swal.fire({
          position: "top",
          icon: "warning",
          title: "Por favor, introduce tu contraseña.",
          showConfirmButton: false,
          timer: 1000,
        });
        return;
      }

      try {
        const user = await login(this.rfc, this.password);

        // Guardar permisos en Vuex
        this.$store.dispatch("setToken", user.token);
        this.$store.dispatch("setUser", user.usuario);

        // guardarlos en localStorage,
        localStorage.setItem("token", user.token);
        localStorage.setItem("user", JSON.stringify(user.usuario));

        const permisos = await getPermisos(this.rfc);
        localStorage.setItem("permisos", JSON.stringify(permisos));
        this.$store.dispatch("setPermisos", permisos);

        this.$router.push("/");
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        Swal.fire({
          position: "top",
          icon: "warning",
          title:
            "Hubo un problema al iniciar sesión. Por favor intenta de nuevo.",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    },
  },
};
</script>
