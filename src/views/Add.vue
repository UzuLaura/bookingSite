<template>
  <div class="add">
    <form class="container section" v-on:submit.prevent="addProperty">
      <!-- PROPERTY NAME FIELD -->
      <div class="field">
        <label class="label">Property Name</label>
        <div class="control">
          <input class="input" v-model="property.name" type="text" placeholder="Property title">
        </div>
      </div>
      <!-- CITY AND PRICE FIELD -->
      <div class="field is-horizontal">
        <div class="field-body">
          <!-- City -->
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
          <!-- Price -->
          <div class="field">
            <label class="label">Price</label>
            <div class="control">
              <input class="input" v-model="property.price" type="text" placeholder="Price per night">
            </div>
          </div>
        </div>
      </div>
      <!-- DESCRIPTION FIELD -->
      <div class="field">
        <label class="label">Description</label>
        <div class="control">
          <textarea class="textarea" v-model="property.description" placeholder="Write description about your place..."></textarea>
        </div>
      </div>
      <!-- IMAGE FIELD -->
      <div class="field">
        <label class="label">Images (at least one)</label>
        <div class="control">
          <input class="input" v-model="property.image" type="text" placeholder="Image url">
        </div>
      </div>
      <!-- ADD MORE IMAGES BUTTON -->
      <div class="field is-horizontal">
          <div class="control add-more" v-on:click="addInputField">
            <span class="tag is-danger">+</span> <strong>Add More Images</strong>
          </div>
      </div>
      <!-- MORE IMAGES FIELD -->
      <div class="field" v-for="index in imageInputs" :key="index">
        <input class="input" v-model="property.extraImage[index]" type="text" placeholder="Image url">
      </div>
      <button class="button is-primary is-pulled-right" type="submit">Add Property</button>
    </form>
  </div>
</template>

<script>
  import firebase from 'firebase/app';
  import 'firebase/auth';

  export default {
      name: 'Add',
      data () {
          return {
              property: {
                  name: '',
                  city: '',
                  price: '',
                  description: '',
                  image: '',
                  extraImage: []
              },
              imageInputs: [],
              imageInputIndex: 0
          }
      },
      methods: {
          addInputField () {
              this.imageInputIndex++
              this.imageInputs.push(this.imageInputIndex)
              console.log(this.property.extraImage)
          },
          addProperty () {
              firebase
                  .firestore()
                  .collection('properties')
                  .add({
                      user: firebase.auth().currentUser.uid,
                      name: this.property.name,
                      city: this.property.city,
                      price: this.property.price,
                      description: this.property.description,
                      image: this.property.image
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
</style>