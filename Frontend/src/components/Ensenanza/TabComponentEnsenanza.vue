<template>
    <div>
        <!-- Pestañas -->
        <div class="flex space-x-4 m-2">
            <button v-for="(tab, index) in tabs" :key="index" @click="activeTab = tab"
                :class="['px-4 py-2 text-base font-bold text-primaryBlue', activeTab === tab ? 'bg-SecundaryGold text-white border rounded-lg' : 'rounded-lg hover:bg-gray-300 hover:duration-500 hover:ease-in-out']">
                {{ tab }}
            </button>
        </div>
        <hr class="h-px bg-gray-300 border-0 m-0">
        <!-- Contenido de las pestañas -->
        <div >
            <div v-if="activeTab === 'Ejercicios'">
                <TabEjercicios />
            </div>
            <div v-if="activeTab === 'Examenes'">
                <TabExamenes />
            </div>
            <div v-if="activeTab === 'Apuntes'">
                <TabApuntes />
            </div>
        </div>

    </div>
</template>

<script>
    import TabApuntes from './TabApuntes.vue';
    import TabEjercicios from './TabEjercicios.vue';
    import TabExamenes from './TabExamenes.vue';

    export default {
        components: {
            TabApuntes,
            TabEjercicios,
            TabExamenes
        },
        data() {
            return {
                activeTab: 'Examenes', // Pestaña activa por defecto
                tabs: ['Ejercicios', 'Examenes', 'Apuntes'] // Puedes añadir más pestañas aquí
            };
        }
    };
</script>