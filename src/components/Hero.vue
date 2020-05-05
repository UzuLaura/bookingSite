<template>
    <div class="hero">
        <section class="hero hero-color">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        {{ this.$route.name }}
                    </h1>
                    <h2 class="subtitle">
                        Subtitle
                    </h2>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: "Hero",
        beforeMount () {
            console.log(this.$router)
        }
    }
</script>

<style scoped>
    .hero-color {
        background: rgb(255,255,255);
        background: linear-gradient(157deg, rgba(255,255,255,1) 0%, rgba(95,134,207,1) 28%, rgba(62,103,180,1) 35%, rgba(46,88,166,1) 50%, rgba(66,106,182,1) 65%, rgba(95,134,207,1) 72%, rgba(255,255,255,1) 100%);
        border-bottom: 1px solid white;
        border-top: 1px solid white;
    }
    .hero-color h1,
    .hero-color h2 {
        color: white;
    }
</style>