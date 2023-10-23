<template>
  <div class="container mx-auto">
    <HeaderModule
      titulo="Enseñanza - Materias"
      ciclo="AGTO - NOV 2023"
    />
    <div
      class="w-full bg-white shadow-xl border rounded-lg border-gray-300 mb-3"
    >
      <div class="m-3">
        <form @submit.prevent="handleSubmit" class="space-y-4">
          
          <div class="flex items-center justify-between space-x-4">
            <div class="flex items-center space-x-4 w-1/2">
              <label for="usuarios" class="w-1/4">Docentes:</label>
              <multiselect
                id="usuarios"
                v-model="selectedUser"
                :options="users"
                label="nameUser"
                track-by="rfc"
                placeholder="Selecciona un docente"
                class="flex-grow"
              ></multiselect>
              <button
                type="button"
                @click="addUser"
                class="ml-2 px-3 py-1 bg-blue-500 text-white rounded"
              >
                +
              </button>
            </div>

            <div class="flex items-center space-x-4 w-1/2">
              <label for="materias" class="w-1/4">Materias:</label>
              <multiselect
                id="materias"
                v-model="selectedMateria"
                :options="materias"
                label="nombreMateria"
                track-by="idMateria"
                placeholder="Selecciona una materia"
                class="flex-grow"
              ></multiselect>
            </div>
          </div>
          <!-- Botón de envío del formulario -->
          <div class="text-center mt-4">
            <button
              type="submit"
              class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="w-full bg-white shadow-xl border rounded-lg border-gray-300">
      <div class="m-2">
        
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import HeaderModule from "../components/HeaderModuleComponent.vue";
import apiEnsenanza from "../services/apiEnsenanza"; // Asumiendo que está en una carpeta llamada services.

export default {
  components: {
    Multiselect,
    HeaderModule,
  },
  data() {
    return {
      users: [],
      selectedUser: null,
      materias: [],
      selectedMateria: null,
    };
  },
  created() {
    this.fetchUsers();
    this.fetchMaterias();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await apiEnsenanza.getUsuarios();
        this.users = response.data.map((user) => ({
          ...user,
          nameUser: `${user.n_plaza} - ${user.nombre_Doce}`,
        }));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },

    async fetchMaterias() {
      try {
        const response = await apiEnsenanza.getMaterias();
        this.materias = response.data;
      } catch (error) {
        console.error("Error fetching materias:", error);
      }
    },

    handleSubmit() {
      console.log({
        usuario: this.selectedUser,
        materia: this.selectedMateria,
      });
    },
  },
};
</script>
