<template>
    <router-link :to="card.route">
        <div class="my-8 border border-gray-500  rounded shadow-lg shadow-gray-200 bg-white duration-300 hover:-translate-y-1 ">
                <figure>
                    <img :src="card.img" :alt="card.alt" class="rounded h-72 w-full object-cover">
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