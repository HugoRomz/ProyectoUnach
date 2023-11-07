<template>
    <nav class="bg-primaryBlue w-full">
    <div class="container mx-auto flex items-center px-4 h-auto">
      <img src="../assets/unach.png" alt="Logo UNACH" class="h-28 m-1" />
    </div>
  </nav>
  <section class="flex flex-col md:flex-row justify-center items-center p-5 mt-32">
    
    <div class="flex-1 max-w-md">
      <img
        src="../assets/teacher.svg"
        alt="Sample image" 
      />
    </div>
    <div class="flex-1 max-w-md mx-16">
      <div class="text-center md:text-left mb-5">
        <!-- Botones de acceso rápido o social login -->
      </div>
      <div class="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
        <p class="mx-4 mb-0 text-center font-semibold text-slate-500">Bienvenido</p>
      </div>
      <input 
        class="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mb-4" 
        type="text" 
        placeholder="RFC" 
        v-model="rfc"
      />
      <input 
        class="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mb-4" 
        type="password" 
        placeholder="Contraseña" 
        v-model="password"
      />
      <button 
        class="w-full bg-primaryBlue hover:bg-blue-950 text-white uppercase rounded py-2 mb-4" 
        type="button" 
        @click="login"
      >
        Iniciar sesión
      </button>
      <div class="text-center">
        <!-- Enlace a registro -->
      </div>
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
          icon: "warning",
          title: "Atención",
          text: "Por favor, introduce un RFC válido.",
        });
        return;
      }

      // Validación: Contraseña no debe estar vacía
      if (!this.password) {
        Swal.fire({
          icon: "warning",
          title: "Atención",
          text: "Por favor, introduce tu contraseña.",
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
          icon: "error",
          title: "Error",
          text: "Hubo un problema al iniciar sesión. Por favor intenta de nuevo.",
        });
      }
    },
  },
};
</script>
