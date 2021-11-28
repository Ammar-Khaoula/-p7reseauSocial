<template>
    <section class="nav">
       <ul class="menu">
              <li>
                <router-link class="item" :to="{ name: 'Home' }">
                  <table>
                    <th>
                      <td class="icon"><i class="fas fa-home"></i></td>
                      <td class="nom_icon">Accueil</td>
                    </th>
                  </table>
                  </router-link>
              </li>
              <!--<li>
                <router-link class="item" :to="{ name: 'allUser' }">
                  <table>
                    <th>
                      <td class="icon"><i class="fas fa-users"></i></td>
                      <td class="nom_icon">Users</td>
                    </th>
                  </table>
                  </router-link>
              </li>-->
              <li>
                <router-link class="item" :to="{ name: 'updateProfil' }">
                      <table>
                    <th>
                      <td class="icon"><i class="fas fa-user-edit"></i></td>
                      <td class="nom_icon">Modifier le compte</td>
                    </th>
                  </table>
                  </router-link>
              </li>
            </ul>
    </section> 
</template>
<script>
import { mapState } from 'vuex'
//import moment from "moment";
export default{
    name: 'profilForm',
    propos:{
      user: Object,
      post: Object,
    },
    data() {
    return {
      users: "",
    };
  },
  
     mounted: function() {
    //this.$router.push('/MyProfil');
     //const userIdDynamic = this.$store.state.user.userId;
     console.log("debut get all profile: ");

        //this.$store.dispatch('getAllUser');
       // this.$store.dispatch("getUserById");
       // this.$store.dispatch("getAllMyPost");
   },
   computed: {
       ...mapState ({
         user: 'user',
         posts : 'posts',
       })
   }
}
</script>
<style scoped>
li{
  list-style-type: none;
}
a{
  text-decoration: none;
}
ul{
  padding: 30px;
}
table{
  margin: 20px;
}
.icon .fas{
 border: 0px black solid;
 border-radius: 50%;
 padding: 20px;
 font-size: 20px;
 background: #F5B7B1;
 color:white;
}
.nom_icon{
  color:black;
}
</style>