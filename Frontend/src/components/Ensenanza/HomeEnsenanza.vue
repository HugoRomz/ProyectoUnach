<template>
    <div class="container mx-auto">
        <HeaderEnsenanza />
        <div className="grid grid-cols-1 sm:grid-cols-6 sm:grid-rows-5 gap-3 mt-4">
            <!-- Primer elemento -->
            <div className="col-span-1 sm:col-span-2 sm:row-span-2 sm:row-start-1">
                <div class="w-full  bg-white p-4 shadow-xl border rounded-lg border-gray-600 ">
                    <div class="flex flex-col items-center text-center">
                        <h3 class="text-2xl uppercase text-slate-700 font-bold  tracking-wider ">MAxmilioano Emiliano Rosales meléndez</h3>
                        <span class="mt-4">Matricula: <strong class="uppercase text-gray-800">B190043485382</strong></span>
                        <span class="mt-3">RFC: <strong class="uppercase text-gray-800">begv14065400MCSSLGA0</strong></span>
                        <span class="mt-3">Num-Plaza: <strong class="uppercase text-gray-800">12345678910121111</strong></span>
                        <select v-model="selected" >
                            <option disabled value="">Seleccione un elemento</option>
                            <option >A</option>
                            <option >B</option>
                            <option >C</option>
                            
                        </select>
                    </div>
                </div>
            </div>
            <!-- Segundo elemento -->
            <div className="col-span-1 sm:col-span-2 sm:row-span-2 sm:col-start-1 sm:row-start-3">
                <div class="w-full bg-white p-4 shadow-xl border rounded-lg border-gray-600">
                    <!-- Contenido aquí -->
                </div>
            </div>
            <!-- Tercer elemento -->
            <div className="col-span-1 sm:col-span-4 sm:row-span-4 sm:col-start-3 sm:row-start-1">
                <div class="w-full bg-white p-4 shadow-xl border rounded-lg border-gray-600">
                    <!-- Contenido aquí -->
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import HeaderEnsenanza from './HeaderEnsenanza.vue';
    export default {
        components: {
            HeaderEnsenanza
        }
    }
</script>