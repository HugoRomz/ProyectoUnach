<template>
    <div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <CardItem />
    </div>
    </div>
</template>

<script>
    import CardItem from './CardItem.vue';
    export default {
        components:{
            CardItem
        }
    }
</script>