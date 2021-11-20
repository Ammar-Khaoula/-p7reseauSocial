<template>
    <section>
      <HelloWorld/>
      <div class='profile'>
        <div class="profilMi">
          <router-link :to="{ name: 'MyProfil'}">
           <img class="rounded-circle profile-pic" src="../assets/icon.png"  alt="profile image" style="height:350px;"/>
          </router-link>
          <h3> Nom:</h3> 
          <h3>Prenom:</h3> 
          <h4>Bio:</h4> 
        </div>
        <div class="allUser">
          <i class="fas fa-user-tie"></i>
          <main v-for="user in users" :key="user.id">
            <p> {{user.last_name}} {{user.first_name}}</p>
            
          </main>
        </div>
      </div>
    </section>      
</template>

<script>

import { mapState } from 'vuex'
//import profil from "../components/profil.vue";
import HelloWorld from '../components/HelloWorld.vue'

export default {
  name: "MyProfil",
  components: {
   // profil,
    HelloWorld
  },
   computed: {
       ...mapState ({
           users: 'userInfo',
       })
   }
}
</script>
<style scoped>
  .profile{
    display: flex;
    justify-content: space-around;
  }
  .profilMi{
    border: 4px #F5B7B1 solid;
    border-radius: 25px;
    width: 60%;
  }
  .allUser{
    border: 0px black solid;  
    border-radius: 15px;
    background: #F5B7B1;
  }
  .fas{
    color:rgb(236, 4, 4);
    font-size: 60px;
    padding: 20px;
  }
</style>