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
    <main>
           <!--<main class="btn-group"
          v-if="showButton == (user.id == commentaire.userId || user.isAdmin == 1)">-->
              <button class="dropdown-item" data-bs-toggle="modal" data-bs-target="#commentModal" data-bs-whatever="@mdo"
                @click="showModal(comment)">
                <i class="fas fa-edit"></i>
              </button>
                       <div class="modal fade" id="commentModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
          </button>
        </div>
        <div>
          <label for="message-text" class="col-form-label">
            Modifiez votre commentaire ici :
          </label>
          <div class="d-flex justify-content-center">
            <div class="input-group input-group-sm mb-3 mt-3 d-flex flex-row justify-content-start">
              <img class="rounded-circle img-xs" src="../assets/icon.png" alt="" style="height:50px;"/>
              <div class="col-sm-5 col-md-8 ms-3">
                <input class="form-control mr-sm-2 bg-light" v-model="comment" :maxlength="max"
                  type="text" ref="resetInput" placeholder="Publier ici..."
                  aria-label="publication" id="publication"/>
              </div>
              <label class="addImage">
                <span class="title-image">Ajouter image</span>
                <input accept="image/*" type="file" id="FileInput" ref="image"
                name="image_attachment_upload" v-on:change="handleFileUpload()"/>
              </label>
            </div>
          </div>
          <!-- Preview image start here -->
          <div class="p-2 mb-3">
            <template v-if="preview">
                <img :src="preview" class="img-fluid" />
              <div class="d-flex">
                <p class="mb-0 mt-2">file name: {{ image.name }}</p>
              </div>
            </template>
          </div>
          <!-- Preview image end here -->
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
            @click="closedButton()">
            Close
          </button>
          <div>
            <button class="btn btn-primary btn-icon-text btn-edit-profile"
              @click="_updateComment" :disabled="!comment && !image" data-bs-dismiss="modal">
              Republier
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

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