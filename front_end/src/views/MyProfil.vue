<template>
    <div>
      <div class='profile'>
        <i class="fas fa-user-tie"></i>
        <div v-for="user in users" :key="user.id">
          <p> Bonjour: {{user.first_name}}</p>
        <profil/>
        </div>
      </div>
    </div>      
</template>

<script>

import { mapState } from 'vuex'
import profil from "../components/profil.vue";

export default {
  name: "MyProfil",
  components: {
    profil
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
    border: 1px black solid;
    width: 500px;
    height: 350px;
    margin: 150px;  
  }
  .fas{
    border: 1px black solid;
    border-radius: 50%;
    font-size: 90px;
    padding: 20px;
    margin: 20px;
  }
</style>