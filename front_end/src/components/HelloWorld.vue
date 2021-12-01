<template>
  <div class="hello">
<div class="header">
        <div><img id="icon" alt="logo" src="../assets/icone.png"></div>
         <div class="nav">
            <router-link class="item" :to="{ name: 'Home' }">
              <i class="fas fa-home"></i>
            </router-link>
            <div @click="getMyProfil" class="item" aria-current="page" href="#"> 
               profile 
            </div>
            <div @click="getAllUsers" class="item">
               <i class="fas fa-users"></i>
            </div>
            <router-link class="item" :to="{ name: 'login' }" href="javascript:void(0)" @click="logOutClick">
               Deconnexion
            </router-link>
         </div>
      </div>
  </div>
</template>

<script>
import { mapState  } from "vuex";
export default {
  name: 'HelloWorld',
    methods: {
    logOutClick() {
      localStorage.clear("userToken");
      //  we need to dispatch this user to null
      this.$store.dispatch("user", null);
      this.$router.push({ name: '/login' });
    },
    getMyProfil: function () {
       console.log("--------Mon profile :---- ");
        this.$router.push({ name: "MyProfil" });
        if (this.$store.state.user.userId == -1){
        this.$router.push('/');
        return;     
        }
        this.$store.dispatch("getUserById");
        this.$store.dispatch("getAllMyPost");   
    },
    getAllUsers: function () {
        console.log("===================Debut==============");
        this.$store.dispatch('getAllUser');
        this.$router.push('/allUser');     
    },
  },

  computed: {
    //  getting the current user via the state by mapGetters
    ...mapState (["user"]),
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>
.header{
    display: flex;
    height: 180px;
    justify-content: space-between;
}
#icon{
    width: 250px;
    height: 220px;
    margin-left: 25px;
    position: relative;
    bottom: 55px;  
}
.nav a{
    text-decoration: none;
}
.nav .item{
  color: rgb(252, 106, 106);
  font-size: 18px;
  line-height: 70px;
  font-weight:900;
  padding: 20px;
  cursor: grab;
}
.nav i{
  border: 0px black solid;
  border-radius: 50%;
  padding: 15px;
  background: rgb(252, 106, 106, 0.1);
}
@media (max-width: 768px){
  .header{
    display: flex;
    flex-direction: column;
    height: 170px;
}
#icon{
    width: 280px;
    height: 200px;
    margin-left: 5px;
    position: relative;
    bottom: 60px;  
}
.nav .item{
  font-size: 12px;
  line-height: normal;
  font-weight:bold;
  padding: 10px;
  cursor: grab;
  position: relative;
  bottom: 120px;
}
.nav i{
  padding: 10px;
  position: relative;
  bottom: 10px;
}
}
</style>
