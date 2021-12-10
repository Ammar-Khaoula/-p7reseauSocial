<template>
    <div class="section">
            <h1 v-if="mode == 'login'">connexion</h1>
            <h1 v-else>Inscription</h1>
            <p v-if="mode == 'login'">vous avez un compte ? <span class="span" @click = "switchToCreateAcount()"> créer un compte</span></p>
            <p v-else>vous avez déja un compte ? <span class="span" @click = "switchToLogin()"> connexion</span></p>

        <form  class="form-group">
                <div class="form-example name" v-if="mode == 'create'">
                  <input v-model="last_name" type="last_name" name="last_name" id="last_name" required class="form-control" placeholder="Entrer votre nom de famille">
                </div>
                <div class="form-example name" v-if="mode == 'create'">
                  <input v-model="first_name" type="first_name" name="first_name" id="first_name" required class="form-control" placeholder="Entrer votre prenom">
                </div>
                <div class="form-example name" v-if="mode == 'create'">
                  <input v-model="bio" type="pseudo" name="pseudo" id="bio" class="form-control" placeholder="Entrer votre pseudo">
                </div>
                <div class="form-group ">
                  <input class="form-control" v-model="email" type="email" name="email" id="email" required placeholder="Entrez votre mail">
                </div>
                <div class="form-group">
                  <input v-model="password" type="password" name="password" id="password" class="form-control" required placeholder="mot de passe">
                </div>
                <div v-if="mode == 'create' && status == 'error_signup'">
                       <!-- <span class="alert"> Adresse mail déjà utilisée </span>-->
                </div>
                <div v-if="mode == 'login' && status == 'error_login'">
                       <span class="alert"> Email et/ou password invalid </span>
                </div>
                <div class="form-example">
                  <button @click="login()" type="button" id="connexion" v-if="mode == 'login'">
                      <span v-if="status =='loading'">connexion en cours...</span>
                      <span v-else>connexion</span></button>
                  <button @click="signUp()" type="button" id="connexion" :class= "{'button--disabled' : !validatedFields}" v-else>
                      créer un compte</button>
                </div>
        </form>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default{
    name: 'loginForm',
    data: function(){
          return{
              mode: "login",
              first_name: "",
              last_name: "",
              bio: "",
              imagesURL: "",
              email: "",
              password: "",
          }
      },
    computed: {
        validatedFields: function(){
             if(this.mode == "create"){
                 if(this.email != "" && this.password !="" && this.last_name != "" && this.first_name !=""){
                     return true;
                 }else{
                     return false;
                 }

             }else{
                 if(this.email != "" && this.password !=""){
                     return true;
                 }else{
                     return false;
                 }
             }
         },
         ...mapState(['status'])
    },
    methods: {
          switchToCreateAcount: function(){
              this.mode = "create";
          },
          switchToLogin: function(){
              this.mode = "login";
          },
          login: function(){
              const self = this;
               this.$store.dispatch('login',{
                email: this.email,
                password: this.password,
              }).then (function(){
                  self.$router.push('/Home');
              },function(error){
                  console.log(error);
              })
          },
          signUp: function(){
              const self = this;
              this.$store.dispatch('signUp',{
                email: this.email,
                last_name: this.last_name,
                first_name: this.first_name,
                password: this.password,
                imagesURL: this.imagesURL,
                isAdmin: this.isAdmin,
              }).then (function(){
                  self.login();
              },function(error){
                  console.log(error);
              })
          }
      }    
    }
</script>

<style scoped>
.section{
    border: 6px #F1948A solid;
    border-radius: 25px;
    box-shadow: 7px 7px 15px 0px rgba(1, 27, 46, 0.96);
    background: white;
    margin: auto;
    width: 60%;
    padding: 10px;
}
p{
    text-align: center;
    margin-bottom: 50px;
    font-weight: bolder;
    font-size: 20px;
}
.span{
    color: rgb(43, 43, 253);
    text-decoration: underline;
    cursor:grab;
}
form{
    margin: 30px;
}

.form-control{
    margin-top: 10px;
    margin-bottom: 10px;
}
input{
    height: 15px;
    width: 400px;
    border-radius: 20px;
    padding: 20px;
    margin-left: 20px;
    background: #FADBD8;
}
#connexion{
    margin-top: 20px;
    width: 220px;
    height: 60px;
    font-size: 25px;
    padding-bottom: 5px;
    font-weight: bolder;
    border: 3px #FADBD8 solid;
    border-radius: 25px;
    background: #2E86C1;
    color: white;
    box-shadow: 1px 1px 9px 0px rgba(34, 40, 49, 0.69);
}
.alert{
    color: red;
    font-weight: bolder;
}

@media (max-width: 768px){
.section{
 width: 90%;
}
p{
    font-size: 16px;
}
form{
    margin: 5px;
}
input{
    margin: auto;
    width: 95%;
    padding: 20px;
}
#connexion{
    width: 120px;
    height: 40px;
    font-size: 16px;
    font-weight: bold;
}
}
</style>