<template>
    <body class="container">
    <section class="profile-page tx-13">
      <HelloWorld id="helloWorld"></HelloWorld>  
    <div class="col-xl-6 middle-wrapper">
      <postWrite id="postwrite"></postWrite>
    <div class="col-md-12">
      <Post v-for="post in posts" :key="post.id" :post="post" />
    </div>  
    <updatePost/>
    </div>
    </section>
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