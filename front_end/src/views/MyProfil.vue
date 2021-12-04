<template>
  <section>
      <HelloWorld/>  
        <div class="profilMi">
          <a>
            <div class="p-2 mb-3">
            <section v-if="preview">
              <img :src="preview" class="img-fluid" />
              <div class="d-flex">
                <p class="mb-0 mt-2">file name: {{ image.name }}</p>
                  <button class="trash mt-1 ms-5"
                    @click="resetImage" size="2x" for="imageFile">
                  </button>
              </div>
            </section>
           </div>
           <img class="rounded-circle profile-pic" src="../assets/icon.png"  alt="profile image" style="height:200px;"/>
          </a>
          <div class="header-profil d-flex flex-row justify-content-center">
            <div><h1> {{users.last_name}} {{users.first_name}}</h1>  
              <h4>{{users.bio}}</h4>
            </div> 
            <div><profilForm/></div>
          </div>
        </div>
        <postWrite/>
     <main class="pub_post" v-for="post in posts" :key="post.id">
          <div class="title_pub">
            <h2> {{post.User.last_name}} {{post.User.first_name}}</h2>
            <span> {{ new Date(post.createdAt).toLocaleString() }}</span>
          </div>
      <div class="contenu d-flex justify-content-around">
        <div>
            <p class="mb-3 tx-14 ms-3">
              {{post.publication}}
            </p>
            <a class="aCursor" data-bs-toggle="modal" data-bs-target="#postModalImage"
                data-bs-whatever="@mdo" @click="showModal(post)" v-if="post.imageUrl">
              <img class="rounded mx-auto d-block" :src="post.imageUrl" alt="Image de Post" style="height:200px; width:200px;"/>
            </a>
        </div>  
        <div class="btn-group"
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
              <button class="dropdown-item" @click="deletePost(post)">
                Supprimer post
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div class="d-flex post-actions">
        <label class=" d-flex align-items-center text-muted me-4">
          <i class="mb-1 me-2 far fa-comment-alt"></i>
             Commentaire 
          <p> {{post.commentaires.length}}</p>
        </label>
      </div>
    <commentWrite :postId="post.id"></commentWrite>  
    <div class="commentaire_post" v-for="commentaire in post.commentaires" :key="commentaire.id" :commentaire="commentaire">
      <h2> {{commentaire.User.last_name}} {{commentaire.User.first_name}}</h2>
        <div class="d-flex justify-content-between">
          <div>
            <p>{{ commentaire.comment }}</p>
            <a class="aCursor" data-bs-toggle="modal" data-bs-target="#postModalImage"
              data-bs-whatever="@mdo" @click="showModal(commentaire)"
              v-if="commentaire.imageUrl">
             <img class="rounded mx-auto d-block" :src="commentaire.imageUrl" alt="Image de Post" style="height:200px; width:200px;"/>
            </a> 
          </div> 
          <div class="icon" v-if="(user.userId == commentaire.UserId || user.isAdmin)">
            <button
              class="btn btn-Info dropdown-toggle me-5"
              type="button" id="defaultDropdown1" data-bs-toggle="dropdown"
               data-bs-auto-close="true" aria-expanded="false">
            </button>
                <ul class="dropdown-menu" aria-labelledby="defaultDropdown">
                  <li>
                    <button class="dropdown-item" data-bs-toggle="modal" data-bs-target="#commentModal" data-bs-whatever="@mdo"
                      @click="showModal(commentaire)">
                       <i class="fas fa-edit"></i>
                    </button>
                  </li>
                  <li>
                    <button class="dropdown-item" @click="_deleteComment(commentaire)">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </li>
                </ul>
          </div>
        </div>
      </div>
    </main> 
  </section>      
</template>

<script>
import { mapState } from 'vuex'
import profilForm from "../components/profilForm.vue";
import HelloWorld from '../components/HelloWorld.vue';
import postWrite from '../components/postWrite.vue'
import commentWrite from '../components/commentWrite.vue'

export default {
  name: "MyProfil",
  data(){
     return{
       preview:'',  
       post:'', 
       commentaire:'',
     }
   },
  components: {
   profilForm,
   HelloWorld,
   postWrite,
   commentWrite,
  },  
  methods: {
    handleFileUpload() {
      this.image = this.$refs.image.files[0];
      let input = event.target;
      if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
        this.preview = e.target.result;
        };
        this.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },
    resetImage() {
      this.image = null;
      this.preview = null;
    },
    _updatePost: function(){
      const dynamicId = this.post.id;
     // this.$router.push({ name: "updatePost"  }); 
      this.$store.dispatch("updatePost", { dynamicId });
    },
    deletePost: function (post) {
      const dynamicId = post.id;
      console.log("sssssssss: "+dynamicId)
      this.$store.dispatch("deletePost", { dynamicId });
    },
    showModal(commentaire) {
      this.$store.dispatch("getAllcommentaire", commentaire);
    },
    _deleteComment: function (commentaire) {
      const dynamicId = commentaire.id;
      console.log('userrrr:'+dynamicId);
      this.$store.dispatch("deleteComment", { dynamicId });
    }, 
    _updateComment: function () {
      const comment = this.comment;
      const image = this.image;
      const dynamicId = this.commentaire.id;
      console.log("id comment========= "+dynamicId);
      this.$store.dispatch("updateComment", { image, comment, dynamicId });
      this.$refs["resetInput"].value = "";
    },
  },
   computed: {
       ...mapState ({
         users: "userInfo",
         user: "user",
         posts: "posts",
         commentaires : "commentaires",
         commentaire: "commentaire"
       })
   }
}
</script>
<style scoped>
  h1{
    font-weight: bolder;
    font-family:Georgia, 'Times New Roman', Times, serif;
    text-align: center;
  }
 .rounded img{
  width: 150px;
  height: 80px;
  
 }
.profilMi{
    border: 1.5px #fce1de solid;
    border-top: 0.5rem #F5B7B1 solid;
    border-top-right-radius: 60px;
    border-bottom: 0.5rem #F5B7B1 solid;
    border-bottom-left-radius: 60px;
    margin: auto;
    width: 60%;
    padding: 10px;
    margin-bottom: 30px;
}
.title_pub{
  text-align: left;
  border-bottom: 1px #d3d2d2 solid;
}
.title_pub h2{
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.pub_post{
    background: rgb(249, 235, 234, 0.3);
    border-top: 0.5rem #fad5d2 solid;
    border-top-right-radius: 40px;
    margin: auto;
    margin-bottom: 30px;
    width: 60%;
    padding: 10px;
}
.contenu{
  border-bottom: 1px #d4d4d3 solid;
  padding: 10px;
}
.btn-group{
  width: 38px;
  height: 40px;
  padding-top: 3px;
}
.post-actions{
    padding: 20px;
}
.commentaire_post{
    border: 1px #fae4e2 solid;
    background: rgb(249, 235, 234, 0.7);
    border-radius: 25px;
    padding: 10px;
    margin-top: 10px;
    width: 95%;
}
.commentaire_post h2{
    text-align: left;
    font-size: 14px;
    font-weight: bolder;
}
.dropdown-item i {
  font-size: 16px;
}
.fa-edit{
  color: green;
}
.fa-trash-alt{
  color: red;
}
@media (max-width: 768px){
  .commentaire_post{
    width: 100%;
}
  h1{
    font-weight: bold;
  }
 .rounded img{
  width: 80px;
  height: 30px;
 }
.profilMi{
    border-top-right-radius: 30px;
    border-bottom-left-radius: 30px;
    width: 95%;
    margin-bottom: 10px;
}
.pub_post{
    border-top-right-radius: 20px;
    margin: auto;
    width: 95%;
    padding: 10px;
  }
  }
</style>