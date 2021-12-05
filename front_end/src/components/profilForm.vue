<template>
    <section class="nav">
                <router-link class="item" :to="{ name: 'updateProfil' }">
                  <i class="fas fa-user-edit"></i>
                </router-link>
                <updatePost></updatePost>
    </section> 
</template>
<script>
import { mapState } from 'vuex';
import updatePost from "../components/updatePost.vue";

//import moment from "moment";
export default{
    name: 'profilForm',
    propos:{
      user: Object,
      post: Object,
    },
    components:{
      updatePost,
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
a{
  text-decoration: none;
}
.fas{ 
 border: 0px black solid;
 border-radius: 50%;
 padding: 15px;
 font-size: 16px;
 background: #F5B7B1;
 color:white;
 opacity: 0;
}
.fas:hover{
  opacity: 1;
}
</style>