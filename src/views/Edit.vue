<template>
    <div class="edit">
        <div v-bind:class="[spinner, display]">
            <div>
                <img src="../assets/loader.gif" alt="">
            </div>
        </div>
        <div class="container section">
            <div class="notification" v-bind:class="[notification.color, notification.hidden]">
                <button class="delete" v-on:click="close"></button>
                {{ notification.message }}
            </div>
            <form v-on:submit.prevent="editProperty">
                <div class="field">
                    <label class="label">Property Name</label>
                    <div class="control">
                        <input class="input" v-model="property.name" type="text" placeholder="Property title">
                    </div>
                </div>
                <div class="field is-horizontal">
                    <div class="field-body">
                        <div class="field">
                            <label class="label">City</label>
                            <div class="control is-expanded">
                                <div class="select is-fullwidth">
                                    <select v-model="property.city">
                                        <option>Vilnius</option>
                                        <option>Kaunas</option>
                                        <option>Klaipėda</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Price</label>
                            <div class="control">
                                <input class="input" v-model="property.price" type="text" placeholder="Price per night">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="field">
                    <label class="label">Description</label>
                    <div class="control">
                        <textarea class="textarea" v-model="property.description" placeholder="Write description about your place..."></textarea>
                    </div>
                </div>
                <div class="field">
                    <label class="label">Images (at least one)</label>
                    <div class="control">
                        <input class="input" v-model="property.image" type="text" placeholder="Image url">
                    </div>
                </div>
                <div class="field" v-for="(image, index) in property.extraImages" :key="image">
                    <div class="columns is-vcentered">
                        <div class="column">
                            <input class="input" v-model="property.extraImages[index]" type="text" placeholder="Image url">
                        </div>
                        <div class="column is-1">
                            <button class="button is-danger is-small" v-on:click="removeImage(index)">Remove</button>
                        </div>
                    </div>
                </div>
                <div class="field is-horizontal">
                    <div class="control add-more" v-on:click="addInputField">
                        <span class="tag is-danger">+</span> <strong>Add More Images</strong>
                    </div>
                </div>
                <button class="button is-warning is-pulled-right" v-bind:class="loading" type="submit">Edit Property</button>
            </form>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase/app';
    import 'firebase/auth';

    export default {
        name: "Edit",
        data () {
            return {
                spinner: 'spinner',
                display: '',
                notification: {
                    hidden: 'is-hidden',
                    color: '',
                    message: ''
                },
                loading: '',
                property: {
                    ownerID: '',
                    id: '',
                    name: '',
                    city: '',
                    price: '',
                    description: '',
                    image: '',
                    extraImages: [],
                },
                imageInputs: [],
                imageIndex: 0
            }
        },
        methods: {
            addInputField () {
                this.imageInputs.push(this.imageInputIndex)
                this.property.extraImages.push('')
                this.imageInputIndex++
            },
            removeImage (index) {
                this.property.extraImages.splice(index, 1)
            },
            editProperty () {
                this.loading = 'is-loading'
                this.notification.hidden = 'is-hidden'
                firebase
                    .firestore()
                    .collection('properties')
                    .doc(this.property.id)
                    .update({
                        name: this.property.name,
                        city: this.property.city,
                        price: this.property.price,
                        description: this.property.description,
                        image: this.property.image,
                        extraImg: JSON.stringify(this.property.extraImages),
                        editedAt: Date.now()
                    })
                    .then(() => {
                        this.loading = ''
                        this.notification.color = 'is-success'
                        this.notification.message = 'Edited Successfully'
                        this.notification.hidden = ''
                    })
                    .catch(error => {
                        this.loading = ''
                        this.notification.color = 'is-danger'
                        this.notification.message = error
                        this.notification.hidden = ''
                    })
            },
            close () {
                this.notification.hidden = 'is-hidden'
            }
        },
        beforeMount () {
            if (localStorage.getItem('user') === null) {
                this.$router.replace({name: 'Login'})
            } else {
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
                        this.property.ownerID = property.data().user
                    })
                    .then(() => {
                        if (localStorage.getItem('user') !== this.property.ownerID) {
                            this.$router.replace({name: 'Home'})
                        }
                    })
                    .then(() => {
                        this.spinner = ''
                        this.display = 'is-hidden'
                    })
            }
        }
    }
</script>

<style scoped>
    .add-more {
        cursor: pointer;
    }
    .add-more:hover {
        opacity: 0.9;
    }
    .spinner {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
        background: white;
        z-index: 100;
        position: fixed;
        top: 0;
        left: 0;
    }
</style>