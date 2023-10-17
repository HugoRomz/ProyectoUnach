<template>
    <div class="container mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 m-8">
            <HomeList v-for="card in cards" :card="card"/>
        </div>
    </div>
</template>

<script>
    import HomeList from '../components/Home/CardsLink.vue'

    import imgTutorias from '../assets/responsive-pc.jpeg'

    export default {
        components:{
            HomeList
        },
        data () {
            return {
                cards: [
                    {
                        title: 'Tutorias',
                        img: imgTutorias,
                        alt:'png-card-sitio-web',
                        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown',
                        route: '/tutorias'
                    },
                    {
                        title: 'Enseñanza',
                        img: imgTutorias,
                        alt:'png-card-sitio-web',
                        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown',
                        route: '/ensenanza'
                    },
                    {
                        title: 'Investigacion',
                        img: imgTutorias,
                        alt:'png-card-sitio-web',
                        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown',
                        route: '/investigacion'
                    },
                    {
                        title: 'Otro no recuerdo',
                        img: imgTutorias,
                        alt:'png-card-sitio-web',
                        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown',
                        route: '/'
                    }
                ]
            }
        }
    }
</script>