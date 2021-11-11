<template>
   <div>
   
   </div>
</template>
<script>
import { mapState } from 'vuex'
export default{
    name: 'profil',
    propos:{
      user: Object
    },
     mounted: function() {
         this.$router.push('/MyProfil');
     console.log(this.$store.state.user);
        if (this.$store.state.user.userId == -1){
        this.$router.push('/');
        return;     
        }
        this.$store.dispatch('getProfil');
   },
   computed: {
       ...mapState ([{
           user: 'userInfo',
       }])
   }
}
</script>
<style scoped>

</style>