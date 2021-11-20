<template>
  <section  class="input-group input-group-sm mb-3 mt-3 d-inline-flex flex-row justify-content-start">
    <img class="rounded-circle img-fluid s-image" src="../assets/icon.png" alt="" style="height: 150px;"/>
          <div>
          <div class="me-perso float-start mb-5">
            <p>{{ commentaire.comment }}
              {{commentaire.imageUrl}}
            </p>
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
    };
  },

    methods: {
      _deleteComment: function () {
      const dynamicId = this.commentaire.id;
      this.$store.dispatch("deleteComment", { dynamicId });
    }, 
    showModal(commentaire) {
      this.$store.dispatch("getAllcommentaire", commentaire);
    },

  },
    computed: {
    ...mapState(["user", "addComment"]),
  },
  }
</script>
<style scoped>
.far{
  color: rgb(248, 11, 11);
}
</style>