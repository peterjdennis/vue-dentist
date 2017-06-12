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
    apiKey: "AIzaSyDceKDi95KEiCo-GenQkuthEuNbK6qq9o8",
    authDomain: "vue-starter.firebaseapp.com",
    databaseURL: "https://vue-starter.firebaseio.com",
    projectId: "vue-starter",
    storageBucket: "vue-starter.appspot.com",
    messagingSenderId: "850080108363"
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


