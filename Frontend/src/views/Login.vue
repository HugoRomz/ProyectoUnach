<template>
  <img src="../assets/wave.png" alt="wavelogin" class="fixed hidden lg:block inset-0 h-full -z-10" />
  <div class="w-screen h-screen flex flex-col justify-center items-center lg:grid lg:grid-cols-2">
    <img src="../assets/teacher.svg" alt="teacherlogin" class="hidden lg:block w-1/2 hover:scale-150 transition-all duration-500 transform mx-auto" />
    <form class="flex flex-col justify-center items-center w-1/2">
      <img src="../assets/profile.svg" alt="profilelogin" class="w-32" />
      <h2 class="my-8 font-bold text-3xl text-gray-500 text-center tracking-wider">
        Bienvenido
      </h2>
      <div class="relative">
        <i class="pi pi-user absolute text-amber-500 text-xl"></i>
        <input
          class="pl-8 border-b-2 capitalize focus:outline-none focus:border-amber-500 transition-all duration-500 text-lg"
          type="text"
          v-model="rfc"
          placeholder="RFC"
        />
      </div>
      <div class="relative mt-8">
        <i class="pi pi-lock absolute text-amber-500 text-xl"></i>
        <input
          class="pl-8 border-b-2 capitalize focus:outline-none focus:border-amber-500 transition-all duration-500 text-lg"
          type="password"
          v-model="password"
          placeholder="*******"
        />
      </div>
      <button @click.prevent="login"
        class="mt-8 py-3 px-20 bg-amber-500 text-white rounded-full font-bold text-lg uppercase transform hover:translate-y-1 transition-all duration-500"
      >
        Iniciar sesión
      </button>
    </form>
  </div>
</template>

<script>
import { login } from "../services/authServices";
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
    }
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
          icon: 'warning',
          title: 'Atención',
          text: 'Por favor, introduce un RFC válido.',
        });
        return;
      }

      // Validación: Contraseña no debe estar vacía
      if (!this.password) {
        Swal.fire({
          icon: 'warning',
          title: 'Atención',
          text: 'Por favor, introduce tu contraseña.',
        });
        return;
      }

      try {
        const user = await login(this.rfc, this.password);
        
        // Swal.fire({
        //   icon: 'success',
        //   title: '¡Bienvenido!',
        //   text: 'Inicio de sesión exitoso.',
        //   timer: 1500,
        //   showConfirmButton: false
        // });
        localStorage.setItem('token', user.token);
        localStorage.setItem('role', user.usuario.rol);
       this.$router.push("/");
      } catch (error) {
        console.error("Error al iniciar sesión:", error);

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al iniciar sesión. Por favor intenta de nuevo.',
        });
      }
    },
  },
};
</script>

