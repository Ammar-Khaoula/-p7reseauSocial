<template>
        <div class="section">
            <h1 v-if="mode == 'login'">connexion</h1>
            <h1 v-else>Inscription</h1>
            <p v-if="mode == 'login'">vous avez un compte ? <span class="span" @click = "switchToCreateAcount()"> créer un compte</span></p>
            <p v-else>vous avez déja un compte ? <span class="span" @click = "switchToLogin()"> connexion</span></p>

            <form  class="form-example">
                <div class="form-example" id="identifiant" v-if="mode == 'create'">
                  <input v-model="first_name" type="first_name" name="first_name" id="first_name" required class="input" placeholder="first_name">
                  <input v-model="last_name" type="last_name" name="last_name" id="last_name" required class="input" placeholder="last_name">
                </div>
                <div class="form-example">
                  <input v-model="email" type="email" name="email" id="email" required class="input" placeholder="Adresse e-mail">
                </div>
                <div class="form-example">
                  <input v-model="password" type="password" name="password" id="password" class="input" required placeholder="mot de passe">
                </div>
                <div v-if="mode == 'create' && status == 'error_signup'">
                        Adresse mail déjà utilisée
                </div>
                <div v-if="mode == 'login' && status == 'error_login'">
                        Email et/ou password invalid
                </div>
                <div class="form-example">
                  <button @click="login()" type="button" id="connexion" v-if="mode == 'login'">
                      <span v-if="status =='loading'">connexion en cours...</span>
                      <span v-else>connexion</span></button>
                  <button @click="signUp()" type="button" id="connexion" :class= "{'button--disabled' : !validatedFields}" v-else>
                      créer un compte</button>
                </div>
                <i class="fas fa-couch"></i>
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
    border: 6px #b8b6b6 solid;
    border-radius: 25px;
    box-shadow: 7px 7px 15px 0px rgba(128, 62, 48, 0.96);
    margin: 30px 250px;
    width: 55%;
    height: auto;
    background: #e8e8e8;
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
#identifiant{
    display: flex;
}
.input{
    margin-top: 10px;
    margin-bottom: 10px;
}
input{
    height: 15px;
    width: 400px;
    border-radius: 20px;
    padding: 20px;
    margin-left: 20px;
    background: rgb(197, 214, 245);
}
#connexion{
    margin-top: 20px;
    width: 220px;
    height: 60px;
    font-size: 25px;
    font-weight: bolder;
    border-radius: 25px;
    background: #30475e;
    color: white;
    box-shadow: 1px 1px 9px 0px rgba(34, 40, 49, 0.69);
}
</style>