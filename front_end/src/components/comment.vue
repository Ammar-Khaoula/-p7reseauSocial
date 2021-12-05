<template>
  <section class="input-group d-flex flex-column">
      <div class="me-perso">
          <h2> {{commentaire.User.last_name}} {{commentaire.User.first_name}}</h2>
      </div>
        <div class="contenue">
          <div>
            <a class="aCursor" data-bs-toggle="modal" data-bs-target="#postModalImage"
              data-bs-whatever="@mdo" @click="showModal(commentaire)"
              v-if="commentaire.imageUrl">
              <img  class="rounded mx-auto d-block" :src="commentaire.imageUrl" alt="Image de Post" style="height:130px; width:150;"/>
            </a>
            <p>{{ commentaire.comment }}</p>
          </div>       
        <div class="btn-group"
          v-if="(user.userId == commentaire.userId || user.isAdmin)">
          <button
            class="btn btn-Info dropdown-toggle me-5"
            type="button" id="defaultDropdown1" data-bs-toggle="dropdown"
            data-bs-auto-close="true" aria-expanded="false">
          </button>
          <ul  class="dropdown-menu" aria-labelledby="defaultDropdown">
            <li>
              <button class="dropdown-item" data-bs-toggle="modal" data-bs-target="#commentModal" data-bs-whatever="@mdo"
              v-if="showButton == (user.userId == commentaire.userId)"
                @click="showModals(commentaire)">
                <i class="fas fa-edit"> Modifier</i>
              </button>
            </li>
            <li>
              <button class="dropdown-item" @click="_deleteComment">
                <i class="fas fa-trash-alt"> Supprimer</i>
              </button>
            </li>
          </ul>
        </div>
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
    
    _deleteComment: function () {
      const dynamicId = this.commentaire.id;
      this.$store.dispatch("deleteComment", { dynamicId });
    }, 
    showModals(commentaire) {
      const dynamicId = commentaire.id;
      console.log("============"+dynamicId);
      this.$store.dispatch("getCommentbyId", { dynamicId });
    },

  },
    computed: {
    ...mapState(["user", "commentaire"]),
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
  border: 1px #fae4e2 solid;
  background: rgb(249, 235, 234);
  border-radius: 25px;
  padding: 10px;
  margin-top: 10px;
  width: 90%;
}
.me-perso h2{
  text-align: left;
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
.contenue{
  display: flex;
  justify-content: space-between;
}
@media (max-width: 768px){
  h2{
  font-size: 14px;
  font-weight: bolder;
}
.input-group{
  padding: 5px;
  margin-top: 10px;
  width: 100%;
}
.dropdown-item i {
  font-size: 14px;
}
.fa-edit{
  color: green;
}
.fa-trash-alt{
  color: red;
}
}
</style>