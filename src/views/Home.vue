<template>
  <div class="home">
    <div class="container section">
      <div class="margin-bottom" v-for="property in properties" :key="property.title">
        <div class="columns is-vcentered hover card is-marginless">
          <div class="column is-3" v-on:click="viewProperty(property.id)">
            <img class="property-img" :src="property.image" :alt="property.name">
          </div>
          <div class="column" v-on:click="viewProperty(property.id)">
            <h2 class="title is-5">{{ property.name }}</h2>
            <p class="has-text-justified">{{ cutText(property.description) }}</p>
            <br>
            <div class="tags are-medium">
              <span class="tag is-success">Price: {{ property.price }}$</span>
              <span class="tag is-dark">{{ property.city }}</span>
            </div>
              <div class="tags">
                  <span class="tag is-light">Owner: {{ property.owner }} </span>
                  <span class="tag is-light">Created At: {{ convertDate(property.createdAt) }} </span>
              </div>
          </div>
          <div class="column is-2 has-text-centered">
            <button class="button is-warning" v-on:click="editProperty(property.id)">Edit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import firebase from 'firebase/app';
    import 'firebase/auth';

    export default {
        name: "Home",
        data () {
            return {
                properties: [],
                user: localStorage.getItem('user')
            }
        },
        methods: {
            viewProperty (id) {
                this.$router.push('/preview/id/' + id)
            },
            editProperty (id) {
                this.$router.push('/edit/' + id)
            },
            cutText (string) {
                if (string.length > 300) {
                    string = string.substring(0, 300) + '...'
                    return string
                } else {
                    return string
                }
            },
            convertDate (time) {
                const date = new Date(time);
                return date.toString();
            }
        },
        beforeMount () {
            firebase
                .firestore()
                .collection('properties')
                .where('user', '==', this.user)
                .orderBy("createdAt")
                .get()
                .then(data => {
                    data.forEach(property => {
                        this.properties.push({
                            id: property.id,
                            name: property.data().name,
                            image: property.data().image,
                            price: property.data().price,
                            description: property.data().description,
                            city: property.data().city,
                            owner: property.data().ownerName,
                            createdAt: property.data().createdAt
                        })
                    })
                })
        }
    }
</script>

<style scoped>
  .hover:hover {
    opacity: 0.9;
    cursor: pointer;
  }
  .margin-bottom {
    margin-bottom: 10px;
  }
  .property-img {
    padding: 20px;
  }
</style>