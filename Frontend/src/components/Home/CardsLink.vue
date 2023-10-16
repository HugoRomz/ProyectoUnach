<template>
    <router-link :to="card.route">
        <div class="mb-4 border border-gray-400 rounded-tl-lg rounded-tr-lg shadow-lg shadow-gray-200 bg-white duration-300 hover:-translate-y-3 hover:shadow-gray-400">
                <figure>
                    <img :src="card.img" :alt="card.alt" class=" h-80 w-full object-cover rounded-tl-lg rounded-tr-lg">
                    <figcaption class="p-4">
                        <p class="text-lg mb-4 font-bold leading-relaxed text-gray-800 ">{{ card.title }}</p>
                        <small class="leading-5 text-gray-500">{{ card.description }}</small>
                    </figcaption>
                </figure>
            </div>
        </router-link>
</template>

<script>
    export default{
        props: ['card']
    }
</script>