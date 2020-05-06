<template>
  <div class="add">
    <div class="container section">
      <!-- NOTIFICATION MESSAGE -->
      <div class="notification" v-bind:class="[notification.color, notification.hidden]">
        <button class="delete" v-on:click="close"></button>
        {{ notification.message }}
      </div>
      <form v-on:submit.prevent="addProperty">
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
        <!-- MORE IMAGES FIELD -->
        <div class="field" v-for="index in imageInputs" :key="index">
          <input class="input" v-model="property.extraImage[index]" type="text" placeholder="Image url">
        </div>
        <!-- ADD MORE IMAGES BUTTON -->
        <div class="field is-horizontal">
          <div class="control add-more" v-on:click="addInputField">
            <span class="tag is-danger">+</span> <strong>Add More Images</strong>
          </div>
        </div>
        <button class="button is-primary is-pulled-right" v-bind:class="loading" type="submit">Add Property</button>
      </form>
    </div>
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
                  extraImage: [],
              },
              imageInputs: [],
              imageInputIndex: 0,
              loading: '',
              notification: {
                  hidden: 'is-hidden',
                  color: '',
                  message: ''
              }
          }
      },
      methods: {
          addInputField () {
              this.imageInputs.push(this.imageInputIndex)
              this.imageInputIndex++
          },
          validation () {
              if (!this.property.name ||
              !this.property.city ||
              !this.property.price ||
              !this.property.description ||
              !this.property.image) {
                  return false
              }
              return true
          },
          addProperty () {
              if (this.validation()) {
                  this.loading = 'is-loading'
                  this.notification.hidden = 'is-hidden'
                  firebase
                      .firestore()
                      .collection('properties')
                      .add({
                          user: localStorage.getItem('user'),
                          name: this.property.name,
                          city: this.property.city,
                          price: this.property.price,
                          description: this.property.description,
                          image: this.property.image,
                          extraImg: JSON.stringify(this.property.extraImage),
                          ownerName: localStorage.getItem('username'),
                          createdAt: Date.now()
                      })
                      .then(() => {
                          this.loading = ''
                          this.notification.color = 'is-success'
                          this.notification.message = 'Added Successfully'
                          this.notification.hidden = ''
                      })
                      .catch(error => {
                          this.loading = ''
                          this.notification.color = 'is-danger'
                          this.notification.message = error
                          this.notification.hidden = ''
                      })
              } else {
                  this.loading = ''
                  this.notification.color = 'is-danger'
                  this.notification.message = "All fields are required!"
                  this.notification.hidden = ''
              }
          },
          close () {
              this.notification.hidden = 'is-hidden'
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