import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import './../node_modules/bulma/css/bulma.css';
import * as firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBdKqeSD419Fw92F3J_uxL6VhyKDjsxwiA",
    authDomain: "bookingsite-684f2.firebaseapp.com",
    databaseURL: "https://bookingsite-684f2.firebaseio.com",
    projectId: "bookingsite-684f2",
    storageBucket: "bookingsite-684f2.appspot.com",
    messagingSenderId: "532696712828",
    appId: "1:532696712828:web:6c4acb10e2260956092bf9"
};

firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
