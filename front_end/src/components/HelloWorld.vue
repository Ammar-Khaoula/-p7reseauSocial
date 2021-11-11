<template>
  <div class="hello">
<div class="header">
        <div><img id="icon" alt="logo" src="../assets/icone.png"></div>
         <div class="nav">
            <router-link :to="{ name: 'MyProfil' }" class="a_profil" aria-current="page" href="#"> 
               profile 
            </router-link>
            <router-link :to="{ name: 'tousUtulisateur' }" class="a_utulisateur" aria-current="page" href="#">
              tous les utilisateurs
            </router-link>
            <router-link :to="{ name: 'login' }" href="javascript:void(0)" @click="logOutClick"
              class="link-acceuil"> Deconnexion
            </router-link>
         </div>
      </div>
  </div>
 
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: 'HelloWorld',
    methods: {
    logOutClick() {
      localStorage.clear("userToken");
      //  we need to dispatch this user to null
      this.$store.dispatch("user", null);
      this.$router.push({ name: '/login' });
    },
  },
  computed: {
    //  getting the current user via the state by mapGetters
    ...mapGetters(["user"]),
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
    color: rgb(105, 105, 105);
    margin-left: 30px;
    position: relative;
    top: 50px;
    font-size: 18px;
    line-height: 70px;
    font-weight: bolder;
}

.text p{
    border: 1px brown solid;
    width: 50%;
    height: 100px;
    margin-top: 30px;
}
</style>
