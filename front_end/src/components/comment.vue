<template>
  <section class="input-group">
      <div class="me-perso d-flex flex-column">
          <h2> {{commentaire.User.last_name}} {{commentaire.User.first_name}}</h2>
          <div class="contenue d-flex flex-wrap">
            <a class="aCursor" data-bs-toggle="modal" data-bs-target="#postModalImage"
              data-bs-whatever="@mdo" @click="showModal(commentaire)"
              v-if="commentaire.imageUrl">
              <img class="rounded mx-auto d-block" :src="commentaire.imageUrl" alt="Image de Post" style="height:200px; width:auto;"/>
            </a>
            <p>{{ commentaire.comment }}</p>
          </div>
      </div> 
           <!--=========== a supprimer  -->
         <!-- <p>{{user.userId}} -- {{commentaire.userId}} -- {{user.isAdmin}}</p> -->        
      <div class="btn-group"
          v-if="(user.userId == commentaire.userId || user.isAdmin)">
            <button class="dropdown-item" data-bs-toggle="modal" data-bs-target="#commentModal" data-bs-whatever="@mdo"
                @click="showModal(commentaire)">
                <i class="fas fa-edit"></i>
            </button>
            <button class="dropdown-item" @click="_deleteComment">
                <i class="fas fa-trash-alt"></i>
            </button>
      </div>
  </section>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'comment',
  props: ["commentaire"],
  data() {
    return {
      showButton: true,
      commentMidalId: null,
      comment:'',
      image: "",
      max: 280,
      preview: "",
    };
  },

    methods: {
        handleFileUpload() {
      let input = event.target;
      console.log(event);
      if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
        };
        this.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },
    closedButton() {
      this.image = null;
      this.preview = null;
    },
     /*_updateComment: function () {
      const comment = this.comment;
      const image = this.image;
      const dynamicId = this.commentaire.id;
      console.log("id comment========= "+dynamicId);
      this.$store.dispatch("updateComment", { image, comment, dynamicId });
      this.$refs["resetInput"].value = "";
    },*/
      _deleteComment: function () {
      const dynamicId = this.commentaire.id;
      this.$store.dispatch("deleteComment", { dynamicId });
    }, 
    showModal(commentaire) {
      this.$store.dispatch("getAllcommentaire", commentaire);
    },

  },
    computed: {
    ...mapState(["user", "addComment", "commentaire"]),
  },
  }
</script>
<style scoped>
h2{
  font-size: 16px;
  font-weight: bolder;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
.input-group{
  border: 1.5px #badef7  solid;
  border-radius: 25px;
  width: 500px;
  padding: 10px;
  background: #f8f5f4;
}
.rounded img{
  width: 150px;
  height: 80px;
  padding-left: 30px;
}
.contenue{
  justify-content: space-between;
}
.me-perso h2{
  float: left;
}
.btn-group{
  position: absolute;
  left: 530px;
}
.dropdown-item{
  position: relative;
  padding: 15px;
  margin: 5px;
  border: 0px black solid;
  border-radius: 75%;
  background: #fad3ce;
}
.dropdown-item i {
  color: white;
  font-size: 20px;
}
</style>