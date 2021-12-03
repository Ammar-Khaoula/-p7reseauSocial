<template>
  <div class="card-header">
        <div class="d-flex">
          <img class="rounded-circle profile-pic" src="../assets/icon.png"  alt="profile image"/>
          <h2 @click="getMyProfil"> {{post.User.last_name}}  {{post.User.first_name}} <br>
            <span> {{ new Date(post.createdAt).toLocaleString() }}</span>
          </h2>  
        </div> 
    <section class="card-body">
              <!--=========== a supprimer  -->
          <p>{{user.userId}} -- {{post.UserId}} -- {{user.isAdmin}}</p>
      <main class="btn-group"
          v-if="showButton == (user.userId == post.UserId || user.isAdmin)">
          <button
            class="btn btn-Info dropdown-toggle me-5"
            type="button" id="defaultDropdown1" data-bs-toggle="dropdown"
            data-bs-auto-close="true" aria-expanded="false">
          </button>
          <ul  class="dropdown-menu" aria-labelledby="defaultDropdown">
            <li>
              <button class="dropdown-item"  type="button" data-bs-toggle="modal"
                data-bs-target="#postModal"
                data-bs-whatever="@mdo"
                v-if="showButton == (user.userId == post.UserId)"
                @click="showModal(post)">
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
    <div class="form-group pub_post" v-if="post">
      <!--<select class="form-control" id="exampleFormControlSelect1">
        <option>{{ post.publication }}</option>
      </select>-->
      <!--<span>Message is: {{ likes }}</span>
     <br> 
     <input type="text" v-model="likes" placeholder="edit me">-->

        <p class="mb-3 tx-14 ms-3">
         {{ post.id }} -- {{ post.publication }}  
        </p>  
        <a class="aCursor" data-bs-toggle="modal" data-bs-target="#postModalImage"
          data-bs-whatever="@mdo" @click="showModal(post)"
          v-if="post.imageUrl">
          <img class="rounded mx-auto d-block" :src="post.imageUrl" alt="Image de Post" id="image-post"/>
        </a>
      </div>
      <div class="d-flex post-actions">
        <label class=" d-flex align-items-center text-muted me-4 text-decoration-none" for="commentText">
          <i class="mb-1 me-2 far fa-comment-alt"></i>
            Commentaire 
           <p> {{post.commentaires.length}}</p>
        </label>
      </div>
      <div class="card-footer">
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
       showButton: true,
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

    _getPostById: function () {
     const dynamicId = this.post.id;
     console.log(" id ++++++++"+dynamicId);
     this.$store.dispatch("getPostById", { dynamicId });
      },

      showModal(post) {
       const dynamicId = post.id;
        console.log(" id ++++++++"+dynamicId);
        this.$store.dispatch("getPostById", { dynamicId });
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
   computed: {
    ...mapState(["user", "posts"]),
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-header{
    background: rgb(249, 235, 234, 0.3);
    border-top: 0.5rem #fad5d2 solid;
    border-top-right-radius: 40px;
    margin: auto;
    margin-bottom: 30px;
    width: 60%;
    padding: 10px;
}
.btn{
  position: relative;
  left: 285px;
  bottom: 55px;
  background: #fcd3ad;
}
.pub_post{
  padding: 20px;
}
a{
  text-decoration: none;
}
.d-flex{
 border-bottom: 1px #d3d2d2 solid;
}
.d-flex img{
  height: 50px;
}
#image-post{
  height: 200px;
  width: auto;
}
.d-flex span{
  font-size: 12px;
  color: rgb(124, 124, 124);
}
.d-flex h2{
 text-transform: capitalize;
 font-weight: bolder;
 font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
 font-size: 20px;
}
.post-actions{
  border-top:1px rgb(219, 217, 217, 0.7) solid;
  padding-top: 20px;
}
.card-footer{
  background: rgb(249, 235, 234, 0.3);
}
@media (max-width: 768px){
  .card-header{
    width: 100%;
}
.btn{
  position: relative;
  left: 285px;
  bottom: 55px;
}
.pub_post{
  padding: 20px;
}
#image-post{
  height: 200px;
  width: 200px;
}
.d-flex img{
  height: 50px;
  padding-bottom: 15px;
}
.d-flex span{
  font-size: 10px;
}
.d-flex h2{
 font-size: 14px;
}
.post-actions{
  border-top:1px rgb(219, 217, 217, 0.7) solid;
  padding-top: 20px;
}
}
</style>
