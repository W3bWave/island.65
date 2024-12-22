<script>
    import api from '@/pfdoAPI'

    export default{
        name: "ReviewsView",
        data(){
            return {
                id: this.$route.params.id,
                reviews: []
            }
        },
        async mounted(){
            this.reviwes = await api.getReviews(this.id)
            console.log(this.reviews)
        }
    }
</script>

<template>
    <div class="container">
    </div>
</template>
