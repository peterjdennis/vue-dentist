
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import firebase from 'firebase'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import TChat from './components/pages/TChat'

Vue.use(VueRouter);


const routes = [
  {
    path: '/login', component: Login
  },
  {
    path: '/register', component: Register
  },
  {
    path: '/', component: TChat
  }
];

const router = new VueRouter({routes});




let config = {
  apiKey: "AIzaSyCwUoiS7P89NLUiUQyLhJJdvgI1OrfEATI",
  authDomain: "vue-chatfire.firebaseapp.com",
  databaseURL: "https://vue-chatfire.firebaseio.com",
  storageBucket: "vue-chatfire.appspot.com",
  messagingSenderId: "539342432440"
};
firebase.initializeApp(config);
window.firebase = firebase;

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router
});
