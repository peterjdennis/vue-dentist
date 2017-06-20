<template>
  <div>
    <div>
    <div>
      <div clss="conatiner-fluid">
        <div class="row justify-content-center">
          <div class="col-4 login">
            <form>
              <div class="form-group">
                <input type="name" class="form-control" placeholder="name" v-model.trim="name" required>
              </div>
              <div class="form-group">
                <input type="email" class="form-control" placeholder="Email" v-model.trim="email" required>
              </div>
              <div class="form-group">
                <input type="password" class="form-control" placeholder="Password" v-model.trim="password" required>
              </div>
              <div class="form-group">
                <input type="password" class="form-control" placeholder="Confirm Password" v-model.trim="password_confirm" required>
              </div>
              <button type="button" class="btn btn-primary" @click.prevent="register" :class="{'loading':isLoading}">Sign Up</button>
              <div class="ui error message" v-if="hasErrors">
                <p v-for="error in errors">{{error}}</p>
              </div>
            </form>
            <div class="ui message">
              <router-link to="/login">Login</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>

    import md5 from 'md5'

    export default{
    name: 'register',
        data(){
            return{
                    name: '',
                    email: '',
                    password: '',
                    password_confirm: '',
                    errors: [],
                    usersRef: firebase.database().ref('users'),
                    isLoading: false

            }
        },
        computed: {
            hasErrors(){
              return this.errors.length > 0;
            }
        },
        methods: {
            register(){
              console.log("Register")
              this.errors = [];


              if(this.isFormValid()){

                this.isLoading = true;

               firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                    .then(user => {
                              console.log("register complete " + user.email);
                              user.updateProfile({
                                displayName: this.name,
                                photoURL: "http://www.gravatar.com/avatar/" + md5(user.email) + "?d=identicon"
                              }).then(() => {
                                    this.saveUserToUserRef(user).then( () => {
                                        this.$store.dispatch("setUser", user)
                                        this.$router.push('/profile')

                                    });
                              }, error => {
                                    console.log(error)
                                    this.errors.push(error.message)
                                    this.isLoading = false;
                              });


                            }).catch(error => {
                                     console.log(error);
                                     this.errors.push(error.message)
                                     this.isLoading = false;
                            });

              }//end if method register

            },
            saveUserToUserRef(user){

              return this.usersRef.child(user.uid).set({
                  name: user.displayName,
                  avatar: user.photoURL

              })

            },
            isEmpty(){
              if(this.name.length == 0 || this.email.length == 0 || this.password.length == 0 || this.password_confirm == 0){
                return true;
              }
              return false;
            },
            passwordValid(){
              if(this.password.length < 6 || this.password_confirm.length < 6){
                return false;
              }
              if(this.password !== this.password_confirm){
                return false;
              }
              return true;
            },
            isFormValid(){
              if(this.isEmpty()){
                this.errors.push('Please complete entire Sign Up')
                return false;
              }
              if(!this.passwordValid()){
                this.errors.push('Passwords do not match')
                return false;
              }
              return true;
            }
        }//end methods
    }


</script>

<style scoped>

  .login_container{
    margin-top: 40px;
  }
  .column{
    max-width: 450px;
  }



</style>
