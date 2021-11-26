<template>
    <section>
      <HelloWorld/>
     <h1> tous les users</h1>
  
     <div class="allUser">
      <i class="fas fa-user-tie"></i>
        <main v-for="(user,index) in users" :key="index">
        <p> {{user.last_name}} {{user.first_name}}</p>           
      </main>
          
        </div>
    </section>      
</template>

<script>

import { mapState } from 'vuex'
import HelloWorld from '../components/HelloWorld.vue'
export default {
  name: "MyProfil",
  propos:{
    user: Object,
    },
  components: { 
   HelloWorld,
  },
  /*data(){
    return{
      users:[]
    }
  },*/
  
    mounted: function() {
    this.$router.push('/allUser');
     //const userIdDynamic = this.$store.state.user.userId;
     console.log("debut get all profile ");
        if (this.$store.state.user.userId == -1){
        this.$router.push('/');
        return;     
        }
        this.$store.dispatch('getAllUser');

   },
   computed: {
       ...mapState ({
         users: 'userInfo',
       })
   }
}
</script>
<style scoped>
  .profilMi{
    border: 1.5px #fce1de solid;
    border-top: 0.5rem #F5B7B1 solid;
    border-top-right-radius: 60px;
    border-bottom: 0.5rem #F5B7B1 solid;
    border-bottom-left-radius: 60px;
    margin: auto;
    margin-bottom: 80px;
    width: 60%;
    padding: 10px;
  }
  .pub_post{
    background: #edf6fc;
    border-top: 0.5rem #5DADE2 solid;
    border-top-right-radius: 60px;
    margin: auto;
    margin-bottom: 20px;
    width: 60%;
    padding: 10px;
  }
</style>