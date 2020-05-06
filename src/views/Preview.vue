<template>
    <div class="preview">
        <section class="section container">
            <h2 class="title has-text-centered">{{ property.name }}</h2>
            <hr>
            <!--NOTIFICATION-->
            <div class="notification is-danger" ref="notification" v-bind:class="[notification.color, notification.hidden, notification.fixed]">
                <button class="delete" v-on:click="close"></button>
                <div class="has-text-centered">
                    <p>{{ notification.message }}</p>
                    <button class="button is-danger is-inverted is-outlined confirm-btn" v-on:click="removeProperty">Confirm</button>
                </div>
            </div>
            <!--PROPERTY DESCRIPTION-->
            <div class="columns">
                <div class="column is-6">
                    <img :src="property.image" :alt="property.name">
                    <span class="tag is-black">{{ property.city }}</span>
                </div>
                <div class="column is-6">
                    <span class="tag is-large is-success">Price: {{ property.price }}$</span>
                    <div class="buttons is-pulled-right">
                        <button class="button is-warning" v-on:click="editProperty">Edit</button>
                        <button class="button is-danger" v-on:click="removeAlert">Delete</button>
                    </div>
                    <hr>
                    <p>{{ property.description }}</p>
                </div>
            </div>
            <!--CAROUSEL-->
            <div class="carousel-img level" v-bind:style="{ background: 'url(' + property.extraImages[imageIndex] + ')' }">
                <span class="button carousel-btn is-light is-outlined level-left" v-on:click="carouselBack">&lt;</span>
                <span class="button carousel-btn is-light is-outlined level-left" v-on:click="carouselForward">&gt;</span>
            </div>
        </section>
    </div>
</template>

<script>
    import firebase from 'firebase/app';
    import 'firebase/auth';

    export default {
        name: "Preview",
        data () {
            return {
                notification: {
                    hidden: 'is-hidden',
                    color: '',
                    fixed: ''
                },
                property: {
                    ownerID: '',
                    id: '',
                    name: '',
                    description: '',
                    image: '',
                    extraImages: [],
                    price: '',
                    city: ''
                },
                imageIndex: 0
            }
        },
        methods: {
            carouselForward () {
                if (this.imageIndex < this.property.extraImages.length - 1) {
                    this.imageIndex++
                } else {
                    this.imageIndex = 0
                }
            },
            carouselBack () {
                if (this.imageIndex > 0) {
                    this.imageIndex--
                } else {
                    this.imageIndex = this.property.extraImages.length - 1
                }
            },
            close () {
                this.notification.hidden = 'is-hidden'
            },
            removeAlert () {
                this.notification.color = 'is-danger'
                this.notification.message = 'Are you sure you want to delete this property?'
                this.notification.fixed = 'fixed-notification'
                this.notification.hidden = ''

            },
            removeProperty () {
                firebase
                    .firestore()
                    .collection('properties')
                    .doc(this.property.id)
                    .delete()
                    .then(() => {
                        this.$router.replace({ name: "Home" })
                    })
            },
            editProperty () {
                this.$router.push('/edit/' + this.property.id)
            }
        },
        beforeMount () {
            firebase
                .firestore()
                .collection('properties')
                .doc(this.$route.params.id)
                .get()
                .then(property => {
                    this.property.id = property.id
                    this.property.name = property.data().name
                    this.property.description = property.data().description
                    this.property.image = property.data().image
                    this.property.extraImages = JSON.parse(property.data().extraImg)
                    this.property.price = property.data().price
                    this.property.city = property.data().city
                    this.property.extraImages.push(this.property.image)
                })
                // .then(() => {
                //     this.imageIndex = setInterval(() => this.carouselForward(), 3000)
                // })
        },
    }
</script>

<style scoped>
    .carousel-img {
        height: 600px;
        background-position: center !important;
        -webkit-background-size: cover !important;
        background-size: cover !important;
    }
    .carousel-btn {
        margin: 10px;
    }
    .confirm-btn {
        margin-top: 10px;
    }
    .fixed-notification {
        position: fixed;
        z-index: 1;
        width: 50%;
        top: 40%;
        left: 25%;
    }
    @media (max-width: 600px) {
        .carousel-img {
            height: 300px;
        }
        .fixed-notification {
            width: 80%;
            top: 40%;
            left: 10%;
        }
    }
</style>