<template>
  <!-- Ventana flotante con formulario -->
  <div
    v-if="visible"
    class="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center"
  >
    <div class="bg-white p-8 rounded-lg w-3/4">
      <h2 class="text-lg mb-4 text-center font-semibold">
        {{ modalTitle }} Proyecto de Investigación
      </h2>
      <form class="w-full" @submit.prevent="submitForm">
        <input type="text" id="idProyecto" v-model="form.idProyecto" />

        <div class="flex flex-wrap -mx-3 mb-6">
          <!-- Columna Izquierda -->
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <!-- 1. Ciclo Escolar -->
            <div class="mb-6">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="cicloEscolar"
              >
                Ciclo Escolar:
              </label>
              <select
                id="cicloEscolar"
                v-model="form.cicloEscolar"
                class="w-full p-2 rounded border focus:border-blue-400"
              >
                <option value="Agosto - Diciembre">Agosto - Diciembre</option>
                <option value="Enero - Junio">Enero - Junio</option>
              </select>
            </div>
            <!-- 2. Nombre del Proyecto -->
            <div class="mb-6">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="nombreProyecto"
              >
                Nombre del Proyecto:
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="nombreProyecto"
                v-model="form.nombreProyecto"
                type="text"
                placeholder=""
              />
            </div>
            <!-- 3. Fecha de Inicio -->
            <div class="mb-6">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="fechaInicio"
              >
                Fecha de Inicio:
              </label>
              <input
                type="date"
                id="fechaInicio"
                v-model="form.fechaInicio"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>

            <!-- 4. Fecha Final -->
            <div class="mb-6">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="fechaFin"
              >
                Fecha de Finalización:
              </label>
              <input
                type="date"
                id="fechaFin"
                v-model="form.fechaFin"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>

            <!-- 5. Linea de Investigacion -->
            <div class="mb-6">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="lineaInvestigacion"
              >
                Línea de Investigación:
              </label>
              <select
                id="lineaInvestigacion"
                v-model="form.lineaInvestigacion"
                class="w-full p-2 rounded border focus:border-blue-400"
              >
                <!-- Opciones de líneas de investigación aquí. Puedes utilizar v-for para recorrer un array de opciones -->
                <option value="opcion a">opcion a</option>
                <option value="opcion b">opcion b</option>
                <option value="opcion c">opcion c</option>
              </select>
            </div>
            <!-- 6. Lider del Proyecto -->
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="liderProyecto"
                >
                  Lider del Proyecto:
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="liderProyecto"
                  v-model="form.liderProyecto"
                  type="text"
                  placeholder=""
                />
              </div>
            </div>
          </div>

          <!-- Columna Derecha -->
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <!-- 7. Colaboradores -->
            <div class="flex flex-wrap -mx-3 mb-6">
              <!-- Puedes necesitar una lógica adicional para manejar múltiples colaboradores -->
              <div class="w-full px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="colaboradores"
                >
                  Colaboradores:
                </label>
                <input
                  type="text"
                  id="colaboradores"
                  v-model="form.colaboradores"
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
            </div>
            <!-- 8. Status -->
            <div class="mb-6">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="status"
              >
                Status:
              </label>
              <select
                id="status"
                v-model="form.status"
                class="w-full p-2 rounded border focus:border-blue-400"
              >
                <option value="Activo">Activo</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Pendiente">Finalizado</option>
              </select>
            </div>
            <!-- 9. Recursos Utilizados -->
            <div class="mb-6">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="recursosUtilizados"
              >
                Recursos Utilizados:
              </label>
              <textarea
                id="recursosUtilizados"
                v-model="form.recursosUtilizados"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="Describe los recursos utilizados en el proyecto"
                rows="4"
              >
              </textarea>
            </div>
            <!-- 10. Tipo de recursos -->
            <div class="mb-6">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="tipoRecurso"
              >
                Tipo de Recurso:
              </label>
              <select
                id="tipoRecurso"
                v-model="form.tipoRecurso"
                class="w-full p-2 rounded border focus:border-blue-400"
              >
                <option value="Propio">Propio</option>
                <option value="Financiado">Financiado</option>
              </select>
            </div>
            <!-- 11. Estudiantes Colaboradores -->
            <div class="flex flex-wrap -mx-3 mb-6">
              <!-- Puedes necesitar una lógica adicional para manejar múltiples colaboradores -->
              <div class="w-full px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="estudiantesColaboradores"
                >
                  Estudiantes Colaboradores:
                </label>
                <input
                  type="text"
                  id="estudiantesColaboradores"
                  v-model="form.estudiantesColaboradores"
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- Contenedor para los botones, alineados a la derecha -->
        <div class="mt-4 flex justify-end space-x-4">
          <button
            @click="closeModal"
            class="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 text-lg"
          >
            Cerrar
          </button>
          <button
            type="submit"
            form="formId"
            class="bg-blue-800 text-white p-3 rounded-lg hover:bg-blue-900 text-lg"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import VueMultiselect from "vue-multiselect";
import Swal from "sweetalert2";

export default {
  props: ["visible", "idProyecto"],
  components: { VueMultiselect },
  data() {
    return {
      form: {
        idProyecto: "",
        cicloEscolar: "",
        nombreProyecto: "",
        fechaInicio: "",
        fechaFin: "",
        lineaInvestigacion: "",
        liderProyecto: "",
        colaboradores: "",
        status: "",
        recursosUtilizados: "",
        tipoRecurso: "",
        estudiantesColaboradores: "",
      },
      modalTitle: "Insertar",
    };
  },
  methods: {
    closeModal() {
      this.$emit("update:visible", false);
      this.resetForm();
    },
    resetForm() {
      this.form = {
        idProyecto: "",
        nombreProyecto: "",
      };
    },
  },
  mounted() {},
};
</script>
