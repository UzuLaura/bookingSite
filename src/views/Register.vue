<template>
    <div class="register">
        <section class="container section">
            <div class="notification is-success" v-bind:class="hidden">
                <button class="delete" v-on:click="close"></button>
                Registered successfully
            </div>
            <form action="" v-on:submit.prevent="register">
                <div class="field is-horizontal">
                    <div class="field-body">
                        <div class="field">
                            <label class="label">Name</label>
                            <div class="control is-expanded">
                                <input class="input" v-model="user.name" type="text" placeholder="Name">
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Surname</label>
                            <div class="control">
                                <input class="input" v-model="user.surname" type="text" placeholder="Surname">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="field">
                    <label class="label">Email</label>
                    <div class="control">
                        <input class="input" v-model="user.email" type="email" placeholder="Email">
                    </div>
                </div>

                <div class="field">
                    <label class="label">Password</label>
                    <div class="control">
                        <input class="input" v-model="user.password" type="password" placeholder="Password">
                    </div>
                </div>
                <button type="submit" class="button primary-color is-pulled-right">Register</button>
            </form>
        </section>
    </div>
</template>

<script>
    import firebase from "firebase"

    export default {
        name: "Register",
        data () {
            return {
                hidden: 'is-hidden',
                user: {
                    name: '',
                    surname: '',
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            register () {
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(this.user.email, this.user.password)
                    .then(data => {
                        data.user
                            .updateProfile({
                                displayName: this.user.name + ' ' + this.user.surname
                            })
                            .then (() => {
                                this.hidden = ''
                            })
                    })
                    .catch(function(error) {
                        alert(error)
                    })
            },
            close () {
                this.hidden = 'is-hidden'
            }
        }
    }
</script>

<style scoped>
    .primary-color {
        background: #2e58a6;
        color: white;
    }
</style>