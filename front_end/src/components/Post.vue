<template>
  <div class="card-header" style="width:768px; margin-left:10%;">
     <div class="d-flex align-items-center justify-content-between">
        <router-link :to="{ name: 'MyProfil'}">
          <img class="rounded-circle profile-pic" src="../assets/icon.png"  alt="profile image"/>
        </router-link>
       
        <p >{{post.User}}</p>
      </div> 

       <div
          class="btn-group"
          v-if="showButton == (user.id == post.userId || user.isAdmin == 1)">
          <button
            class="btn btn-light dropdown-toggle me-5"
            type="button" id="defaultDropdown1" data-bs-toggle="dropdown"
            data-bs-auto-close="true" aria-expanded="false">
          </button>
          <ul class="dropdown-menu" aria-labelledby="defaultDropdown">
            <li>
              <button class="dropdown-item"  type="button" data-bs-toggle="modal"
                data-bs-target="#postModal" data-bs-whatever="@mdo"
                v-if="showButton == (user.id == post.userId)"
                @click="showModal(post)">
                Modifier post
              </button>
            </li>
            <li>
              <button class="dropdown-item" @click="deletePost"
                v-if=" showButton == (user.id == post.userId || user.isAdmin == 1)">
                Supprimer post
              </button>
            </li>
          </ul>
      </div>
      <div class="card-body">
      <div v-if="post">
        <p class="mb-3 tx-14 ms-3">
          {{ post.publication }}
          {{ post.createdAt }}
          {{ post.imageUrl }}

        </p>  
        <a class="aCursor" data-bs-toggle="modal" data-bs-target="#postModalImage"
          data-bs-whatever="@mdo" @click="showModal(post)"
          v-if="post.imageUrl">
          <img class="img-fluid d-flex" :src="post.imageUrl" alt="Image de Post"/>
        </a>
      </div>
      <div class="card-footer">
      <div class="d-flex post-actions">
      </div>
      </div>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Post',
   props:{
     post: Object
   }, 
   data(){
     return{
        showButton: true,
        User: '',
        userInfo:'',
     }
   },
   methods:{
    deletePost: function () {
      const dynamicId = this.post.id;
      console.log("dynamicId"+ this.post.id);
      this.$store.dispatch("deletePost", { dynamicId });
    },
      showModal(post) {
      this.$store.dispatch("post", post);
      console.log(post);
    },
   },

   computed: {
    //  getting the current user via the state by mapGetters
    ...mapState(["user", "posts"]),
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a img{
  height: 150px;
}

</style>
