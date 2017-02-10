<template>
  <div>

    <div class="ui middle aligned center aligned grid login_container">
      <div class="column">
        <h2 class="ui pink image header">
          <div class="content">
            #Practice::vChatFire
          </div>
        </h2>

        <form class="ui large form" :class="{'error' : hasErrors}">
          <div class="ui stacked segment">
            <div class="field">
              <div class="ui left icon input">
                <i class="user icon"></i>
                <input type="text" name="name" placeholder="ชื่อผู้ใช้" v-model.trim="name" required>
              </div>
            </div>
            <div class="field">
              <div class="ui left icon input">
                <i class="mail icon"></i>
                <input type="email" name="email" placeholder="thsanan.pu.55@ubu.ac.th" v-model.trim="email" required>
              </div>
            </div>

            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input type="password" name="password" placeholder="Password" v-model.trim="password" required>
              </div>
            </div>
            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input type="password" name="password_confirm" placeholder="Password_Confirm"
                       v-model.trim="password_confirm" required>
              </div>
            </div>

            <div class="ui fluid large teal button" @click.prevent="register" :class="{'loading':isLoading}">ลงทะเบียน</div>
          </div>

          <div class="ui error message" v-if="hasErrors">
            <p v-for="error in errors">{{error}}</p>
          </div>

        </form>

        <div class="ui message">
          ต้องการ Login?
          <router-link to="/login">Login</router-link>
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
                                        this.$router.push('/')

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
                this.errors.push('ฟอร์มห้ามว่าง กรุณากรอกให้ครบ')
                return false;
              }
              if(!this.passwordValid()){
                this.errors.push('กรอกข้อมูล Password ไม่ตรงกัน หรือต้องมีอย่างน้อย 6 ตัวอักษร')
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
