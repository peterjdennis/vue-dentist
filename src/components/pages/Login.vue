<template>
  <div>
    <div clss="conatiner-fluid">
      <div class="row justify-content-center">
        <div class="col-4 login">
          <form>
            <div class="form-group">
              <input type="email" class="form-control" placeholder="Email" v-model.trim="email" required>
            </div>
            <div class="form-group">
              <input type="password" class="form-control" placeholder="Password" v-model.trim="password" required>
            </div>
            <button type="button" class="btn btn-primary" @click.prevent="login" :class="{'loading':isLoading}">Login</button>
            <div v-if="hasErrors">
              <p v-for="error in errors">{{error}}</p>
            </div>
          </form>
          <div class="ui message">
            <router-link to="/register">Registration</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

    import firebase from 'firebase'

    export default{
        name: 'login',
            computed: {
            hasErrors(){
              return this.errors.length > 0;
            }
        },
        data(){
            return{

              email: '', password: '', errors: [], isLoading: false, hasError: []

            }
        },
        methods: {
          login(){
            console.log('log in');
            this.errors = [];
            if(this.isFormValid()){
                this.isLoading = true;
                firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then(user => {

                      this.$store.dispatch('setUser', user)
                      this.$router.push('/profile')

                }).catch(error => {

                  this.errors.push(error.message);
                  this.isLoading = false;
                })
            }
          },
          isFormValid(){
            if(this.email.length > 0 && this.password.length > 0){
              return true;
            }
            return false;
          }
        }
    }

</script>

<style scope>
  .login{
    text-align:center;
    border-style: solid;
    border-width: 1px;
    padding: 10px;
  }
</style>
