<template>
    <div class="login">
        <section class="container section">
            <div class="notification is-success" v-bind:class="hidden">
                <button class="delete" v-on:click="close"></button>
                {{ error }}
            </div>
            <form action="" v-on:submit.prevent="login">
                <div class="field">
                    <label class="label">Email</label>
                    <div class="control">
                        <input class="input" v-model="user.email" type="email" placeholder="Enter your email">
                    </div>
                </div>

                <div class="field">
                    <label class="label">Password</label>
                    <div class="control">
                        <input class="input" v-model="user.password" type="password" placeholder="Enter your password">
                    </div>
                </div>
                <button type="submit" class="button primary-color is-pulled-right">Login</button>
            </form>
        </section>
    </div>
</template>

<script>
    import firebase from 'firebase/app';
    import 'firebase/auth';

    export default {
        name: "Login",
        data () {
            return {
                hidden: 'is-hidden',
                error: '',
                user: {
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            login () {
                firebase
                    .auth()
                    .signInWithEmailAndPassword(this.user.email, this.user.password)
                    .then(() => {
                        this.$router.replace({ name: "Home" })
                    })
                    .catch(error => {
                        this.error = error
                        this.hidden = ''
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