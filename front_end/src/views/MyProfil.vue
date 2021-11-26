<template>
    <section>
      <HelloWorld/>
      <div class="my_profil">
        <profilForm/>
        <div class="profilMi">
          <router-link :to="{ name: 'MyProfil'}">
           <img class="rounded-circle profile-pic" src="../assets/icon.png"  alt="profile image" style="height:300px;"/>
          </router-link>
            <h1> {{users.last_name}} {{users.first_name}}</h1>  
            <h4>{{users.bio}}</h4> 
        </div>
      </div>
        <postWrite/>
    <main class="pub_post" v-for="post in posts" :key="post.id">
        <div class="title_pub">
            <h2> {{post.User.last_name}} {{post.User.first_name}}</h2>
            <span> {{ new Date(post.createdAt).toLocaleString() }}</span>
        </div>
        <div class="contenu">
        <div>
            <p class="mb-3 tx-14 ms-3">
              {{post.publication}}
            </p>
        </div>
        <div>
            <a class="aCursor" data-bs-toggle="modal" data-bs-target="#postModalImage"
                data-bs-whatever="@mdo" @click="showModal(post)" v-if="post.imageUrl">
              <img class="rounded mx-auto d-block" :src="post.imageUrl" alt="Image de Post" style="height:200px; width:auto;"/>
            </a>
        </div>  
        </div>
        <div class="d-flex post-actions">
          <label class=" d-flex align-items-center text-muted me-4 text-decoration-none" for="commentText">
            <i class="mb-1 me-2 far fa-comment-alt"></i>
            Commentaire
          </label>
        </div>
         <commentWrite/>  
        <div class="commentaire_post" v-for="commentaire in post.commentaires" :key="commentaire.id">
          <h2> {{commentaire.User.last_name}} {{commentaire.User.first_name}}</h2>
          <p>{{ commentaire.comment }}</p>
          <a class="aCursor" data-bs-toggle="modal" data-bs-target="#postModalImage"
           data-bs-whatever="@mdo" @click="showModal(commentaire)"
           v-if="commentaire.imageUrl">
           <img class="img-fluid d-flex" :src="commentaire.imageUrl" alt="Image de Post"/>
          </a>
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
  components: {
   profilForm,
   HelloWorld,
   postWrite,
   commentWrite,
  },
  
   computed: {
       ...mapState ({
           users: 'userInfo',
           posts : 'posts',
           commentaires:'commentaires'
       })
   }
}
</script>
<style scoped>
  h1{
    font-weight: bolder;
    font-family:Georgia, 'Times New Roman', Times, serif;
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
  }
  .title_pub{
    text-align: left;
  }
  .title_pub h2{
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  }
  .title_pub span{
    font-size: 12; 
    color: gray;
  }
  .pub_post{
    background: rgb(249, 235, 234, 0.3);
    border-top: 0.5rem #fad5d2 solid;
    border-top-right-radius: 40px;
    margin: auto;
    margin-bottom: 20px;
    width: 60%;
    padding: 10px;
  }
  .contenu{
    border-bottom: 1px #d4d4d3 solid;
    padding: 10px;
  }
  .my_profil{
    display: flex;
    justify-content: space-between;
    margin-bottom: 60px;
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
  }
  .commentaire_post h2{
    text-align: left;
    font-size: 14px;
    font-weight: bolder;
  }
</style>