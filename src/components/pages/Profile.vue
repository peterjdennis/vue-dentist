<template>
  <div class="">
    <div class="row">
      <div class="col-lg-3 offset-1 about">
        Name: {{currentUser.displayName}}<br>
        Email: {{currentUser.email}}<br>
        User id: {{currentUser.uid}}
      </div>
      <div class="col-lg-5 offset-1 about">
        <form>
          <div class="form-group">
            <small id="streer" class="form-text text-muted">Street Address</small>
            <input type="text" class="form-control form-control-sm" placeholder="Street Adress" v-model="streetAddress"><br>
            <div class="form-inline">
              <input type="text" class="form-control form-control-sm" placeholder="City" v-model="city">
              <input type="text" class="form-control form-control-sm" placeholder="State" v-model="state">
              <input type="text" class="form-control form-control-sm" placeholder="Zip" v-model="zipCode">
            </div>
          </div>
            <button type="button" class="btn btn-primary" @click="setAddress">Submit</button>
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
import firebase from 'firebase'

  export default {
    name: 'profile',
    data(){
        return{
          streetAddress: '', city:'', state:'',zipCode:''
        }
    },
    computed: {
      ...mapGetters(['currentUser'])
    },
    methods: {
      logout(){
        firebase.auth().signOut();
        this.$store.dispatch("setUser", null);
        this.$router.push('/login');
      },
      setAddress(streetAddress){
        console.log(this.currentUser.uid)
        console.log(this.streetAddress);
        firebase.database().ref('users/' + this.currentUser.uid).update({
          streetAddress:this.streetAddress,
          city:this.city,
          state:this.state,
          zipCode:this.zipCode
        });
      }
    }
  }
</script>

<style scoped>
  .about{
    margin-top:20px;
  }
</style>
