<template>
  <body class="acceuil">
    <div class="container">
    <div class="profile-page tx-13">
      <HelloWorld id="helloWorld"></HelloWorld>
    <div class="row profile-body d-flex flex-row justify-content-center">     
    <div class="col-xl-6 middle-wrapper">
       <postWrite id="postwrite"></postWrite>
    <div class="row mt-4 mt-md-4 mt-lg-0">
    <div class="col-md-12">
    <div class="card rounded">
      <div>
        <Post v-for="post in posts" :key="post.id" :post="post" />
      </div>
    
    </div>
    <updatePost/>
    </div>
    </div> 
    
    </div>
    </div>
    </div>
    </div>
  </body>
</template>

<script>
import { mapState } from 'vuex'
import HelloWorld from '../components/HelloWorld.vue'
import Post from '@/components/Post.vue'
import postWrite from '../components/postWrite.vue'
import updatePost from '../components/updatePost.vue'

export default {
  name: 'Home',
  components: {
     HelloWorld,
     postWrite,
     Post,
     updatePost,   
  },
  created() {
    this.$store.dispatch("getAllPost");
  },
    computed: {
    //  getting the current user via the state by mapGetters
    ...mapState(['posts'])
  },
}
</script>
<style scoped>

</style>