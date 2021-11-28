<template>
  <section  class="input-group input-group-sm mb-3 mt-3 d-inline-flex flex-row justify-content-start">
    <img class="rounded-circle img-fluid s-image" src="../assets/icon.png" alt="" style="height: 150px;"/>
      <div>
        <div class="me-perso float-start mb-5">
          <p> {{commentaire.User.last_name}} {{commentaire.User.first_name}}</p>
          <p>{{ commentaire.comment }}</p>
          <a class="aCursor" data-bs-toggle="modal" data-bs-target="#postModalImage"
           data-bs-whatever="@mdo" @click="showModal(commentaire)"
           v-if="commentaire.imageUrl">
           <img class="img-fluid d-flex" :src="commentaire.imageUrl" alt="Image de Post"/>
          </a>
        </div>
      </div> 
           <!--=========== a supprimer  -->
          <p>{{user.userId}} -- {{commentaire.userId}} -- {{user.isAdmin}}</p>         
          <main class="btn-group"
          v-if="(user.userId == commentaire.userId || user.isAdmin)">

              <button class="dropdown-item" data-bs-toggle="modal" data-bs-target="#commentModal" data-bs-whatever="@mdo"
                @click="showModal(comment)">
                <i class="fas fa-edit"></i>
              </button>
              <button class="dropdown-item" @click="_deleteComment">
                <i class="fas fa-trash-alt"></i>
              </button>
  </main>
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
.input-group{
  border: 1.5px #85C1E9  solid;
}
</style>