<template>
  <nav class="navbar navbar-toggleable-md navbar-light bg-faded nab">
  <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <a class="navbar-brand" href="#">Dentist</a>
  <div class="collapse navbar-collapse" id="navbarText">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <a class="nav-link" v-if="currentUser"><router-link to="/profile">Profile</router-link></a>
      </li>
    </ul>
      <button type="button" class="btn btn-primary btn-sm" v-if="currentUser" @click.prevent="logout">Logout</button>
      <router-link to="/login" v-if="!currentUser">Dentist Sign in</router-link>
    <span class="navbar-text">

    </span>
  </div>
</nav>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters(['currentUser'])
  },
  methods: {
    logout(){
      console.log('logged out');
      firebase.auth().signOut();
      this.$store.dispatch("setUser", null);
      this.$router.push('/login');
    }
  }
}

</script>

<style scoped>
  .nab{
    height:40px;
  }
</style>
