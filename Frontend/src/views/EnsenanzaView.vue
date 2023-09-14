<template>
    <div class="container mx-auto">
        <HeaderModule titulo="Gestion Enseñanza - Aprendizaje" ciclo="AGTO - NOV 2023" />
        <div class="w-full bg-white shadow-xl border rounded-lg border-gray-300">
            <TabComponentEnsenanza />
        </div>
    </div>
</template>

<script>
    import HeaderModule from '../components/HeaderModuleComponent.vue';
    import TabComponentEnsenanza from '../components/Ensenanza/TabComponentEnsenanza.vue';
    export default {
        components: {
            HeaderModule,
            TabComponentEnsenanza
        }
    }
    
</script>