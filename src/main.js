
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import firebase from 'firebase'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import TChat from './components/pages/TChat'
import store from 'store'

Vue.use(VueRouter);


const routes = [
  {
    path: '/login', component: Login
  },
  {
    path: '/register', component: Register
  },
  {
    path: '/',
    component: TChat,
    beforeEnter: (to, from, next) => {

      if(!firebase.auth().currentUser){
        next('/login');
      }else{
        next()
      }
    }
  },

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

const unsuscribe = firebase.auth().onAuthStateChanged(user => {

  store.dispatch('setUser', user);

  new Vue({
    el: '#app',
    template: '<App/>',
    components: { App },
    router, store
  });

  unsuscribe();

});


