<template>
  <div class="card-header" style="width:768px; margin-left:10%;">
    <div class="body">
        <div class="d-flex align-items-center justify-content-between">
          <img class="rounded-circle profile-pic" src="../assets/icon.png"  alt="profile image"/>
          <h2 @click="getMyProfil"> {{post.User.last_name}}  {{post.User.first_name}} </h2>
          <p> {{ new Date(post.createdAt).toLocaleString() }}</p>
        </div> 

    </div>
   <section class="card-body">
              <!--=========== a supprimer  -->
          <p>{{user.userId}} -- {{post.UserId}} -- {{user.isAdmin}}</p>
     <main
          class="btn-group"
          v-if="(user.userId == post.UserId) || user.isAdmin">
          <button
            class="btn btn-Info dropdown-toggle me-5"
            type="button" id="defaultDropdown1" data-bs-toggle="dropdown"
            data-bs-auto-close="true" aria-expanded="false">
          </button>
          <ul  class="dropdown-menu" aria-labelledby="defaultDropdown">
            <li>
              <button class="dropdown-item"  type="button"                  
                @click="_updatePost" >
                Modifier post
              </button>
            </li>
            <li>
              <button class="dropdown-item" @click="deletePost">
                Supprimer post
              </button>
            </li>
          </ul>
    </main>
    <div class="pub_post" v-if="post">
      <!--<span>Message is: {{ likes }}</span>
     <br> 
     <input type="text" v-model="likes" placeholder="edit me">-->

        <p class="mb-3 tx-14 ms-3">
         {{ post.id }} -- {{ post.publication }}  
        </p>  
        <a class="aCursor" data-bs-toggle="modal" data-bs-target="#postModalImage"
          data-bs-whatever="@mdo" @click="showModal(post)"
          v-if="post.imageUrl">
          <img class="rounded mx-auto d-block" :src="post.imageUrl" alt="Image de Post"/>
        </a>
        <p>
        <i class="fas fa-heart" v-on:click="likePost()">
          <span>{{post.likes}}</span>
          </i> 
        </p>
      </div>
    <div class="card-footer">
        <div class="d-flex post-actions">
          <label class=" d-flex align-items-center text-muted me-4 text-decoration-none" for="commentText">
            <i class="mb-1 me-2 far fa-comment-alt"></i>
            Commentaire {{post.commentaires.length}}
          </label>
        </div>
         <commentWrite :postId="post.id"></commentWrite>
        <div>     
        <comment v-for="commentaire in post.commentaires" :key="commentaire.id" :commentaire="commentaire" />
      </div>
      <updateComment/>
      </div>
   </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from "moment";
import commentWrite from "../components/commentWrite.vue";
import comment from "../components/comment.vue";
import updateComment from "../components/updateComment.vue";
export default {
  name: 'Post',
   props:{
     post: Object,
     commentaire: Object,
  
   }, 
   components: {
    commentWrite,
    comment,
    updateComment,
  },
   data(){
     return{
       formattedTime: "",
       now: 0,
       createdAt: moment(),
       User: '',
       userInfo:'',
       commentaires: [],
       commentText: "",
       image: "",
       max: 280,
       preview: "",
       likes: 0,
     }
   },
   methods:{   
    getFormattedTime (maDate){
      maDate= moment.format('MM/DD/YYYY hh:mm')
      console.log("===========:"+maDate);
      console.log(this.createdAt);
    },
    deletePost: function () {
      const dynamicId = this.post.id;
      this.$store.dispatch("deletePost", { dynamicId });
    },
    _updatePost: function(){
      const dynamicId = this.post.id;
     // this.$router.push({ name: "updatePost"  }); 
      this.$store.dispatch("updatePost", { dynamicId });
    },
    _getPostById: function () {
     const dynamicId = this.post.id;
     console.log(" id ++++++++"+dynamicId);
     this.$store.dispatch("getPostById", { dynamicId });
      },

      showModal(post) {
      this.$store.dispatch("post", post);
    },
     getMyProfil: function () {
       const dynamicId = this.post.UserId;
       console.log("----------------l'utulisateur est :---- "+ dynamicId);
        this.$router.push({ name: "MyProfil" });
        this.$store.dispatch("getUserById", { dynamicId });
        this.$store.dispatch("getAllMyPost", {dynamicId});
    },
  },
  watch: {
    now() {
      this.formattedTime = this.getFormattedTime(this.post.updatedAt);
    },
  },
  /*created() {
    this.formattedTime = moment();
    this.formattedTime = this.getFormattedTime(this.post.updatedAt);
    setInterval(() => {
      this.now = moment();
    }, 3000);
  },*/
   computed: {
    //  getting the current user via the state by mapGetters
    ...mapState(["user", "posts"]),
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.body{
  background: #f8b4ac;
  border-top: 0.5rem #5DADE2 solid;
  border-top-right-radius: 60px;
  padding: 20px;
}
.btn{
  position: relative;
  left: 356px;
  top: 40px;
  background: #85C1E9;
  border:3px #f8b4ac solid;
}
.pub_post{
  background: #FDEDEC;
  padding: 10px;
  padding-bottom: 30px;
}
.card-footer{
  background: #EBF5FB;
}
a{
  text-decoration: none;
}
.d-flex img{
  height: 150px;
}
h3{
  font-size: 16px;
}
</style>
