<template>
    <section>
      <HelloWorld/>
    <div class="allUser">
      <h1> Tous Les Utilisateurs</h1>
      <div class="flex">
        <main v-for="(user, index) in users" :key="index">
         <div class="users">
           <i class="fas fa-user-tie"></i>
           <p> {{index}} {{user.first_name}}</p>           
          </div> 
        </main> 
    </div>  
    </div>
    </section>      
</template>

<script>

import { mapState } from 'vuex'
import HelloWorld from '../components/HelloWorld.vue'
export default {
  name: "MyProfil",
  components: { 
   HelloWorld,
  },  
    mounted: function() {
     //const userIdDynamic = this.$store.state.user.userId;
     console.log("debut get all profile ");
        if (this.$store.state.user.userId == -1){
        this.$router.push('/');
        return;     
        }
        console.log("===================Debut==============");
        this.$store.dispatch('getAllUser');
        this.$router.push('/allUser');
   },
   computed: {
       ...mapState ({
         users: 'userInfo',
       })
   }
}
</script>
<style scoped>
 .allUser{
  border: 1px black solid;
  padding: 30px;
  margin: 20px;
 }
 .flex{
  display: flex;
  flex-wrap: wrap;
 }
 .users{
  border: 1px #FADBD8 solid;
  border-radius: 20px;
  width: 200px;
  margin: 20px;
 }
 p{
   padding: 40px; 
 }
 .fas{
  border: 0px black solid;
  border-radius: 50%;
  padding: 23px;
  font-size: 18px;
  margin-top: 15px;
  background: #FADBD8;
  color: white;
 }
</style>