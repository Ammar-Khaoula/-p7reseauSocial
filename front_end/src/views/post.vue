<template>
    <HelloWorld/>
</template>
<script>
import { mapState } from 'vuex'
import HelloWorld from '../components/HelloWorld.vue'
export default {
  name: "post",
  components: {
   HelloWorld,
  },
    data: function () {
    return {
      posts: [],
    }
  },
   created () {
    this.$store.commit("getOnePost", this.id);
 
  },
  computed: {
       ...mapState ({
           post: 'post'
       })
  }
}
</script>