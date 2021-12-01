<template>
    <section>
      <HelloWorld/>
    <div class="allUser">
      <h1> Tous Les Utilisateurs</h1>
      <div class="flex">
        <main v-for="(user, index) in users" :key="index">
         <div class="users">
           <i class="fas fa-user-tie"></i>
           <p @click="getMyProfil(user)"> {{user.last_name}} {{user.first_name}}</p>           
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
  name: "allUser",
  components: { 
   HelloWorld,
  },  
  methods:{
     getMyProfil: function (user) {
       const dynamicId = user.id;

       console.log("----------------l'utulisateur est :---- "+ dynamicId);
        this.$router.push({ name: "MyProfil" });
        this.$store.dispatch("getUserById", { dynamicId });
        this.$store.dispatch("getAllMyPost", {dynamicId});
    },
  },
   computed: {
       ...mapState ({
         users: 'userInfo',
         
         posts: "posts",
         post: "post"
       })
   }
}
</script>
<style scoped>
 .allUser{
  border: 0px rgb(0, 0, 0, 0.2) solid;
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
  cursor: grab;
 }
 p{
   padding: 40px; 
   text-transform: capitalize;
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
 @media (max-width: 768px){
  h1{
   font-size: 16px;
   font-weight: bolder;
   }
 .flex{
  display: flex;
  flex-direction: column;
 }
 .users{
  margin: 10px auto;
 }
 }
</style>