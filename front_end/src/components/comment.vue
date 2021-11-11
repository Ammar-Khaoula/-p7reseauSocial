<template>
  <div class="input-group input-group-sm mb-3 mt-3 d-inline-flex flex-row justify-content-start">
    <img class="rounded-circle img-fluid s-image"
      src="../assets/icon.png" alt=""/>
    <div class="ms-2 mt-2 rounded bg-light rounded-3">
      <div class="d-flex flex-column">
        <div class="ms-perso-2 ms-2 mt-2">
          <router-link :to="{ name: 'Home' }"
            class="text-decoration-none me-1 text-dark float-start">
            <span class="fw-bold">
              {{ comment.User.first_name }} {{ comment.User.last_name }}
            </span>
          </router-link>
        </div>
        <div>
          <div class="me-perso float-start mb-5"> {{ comment.comment }} </div>
          <div class="w-50 mt-5 mb-3 me-5">
            <a data-bs-toggle="modal" data-bs-target="#commentImageModal"
              data-bs-whatever="@mdo" @click="showModal(comment)">
              <img class="img-fluid" :src="comment.imageUrl" alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
    <div
      class="btn-group ml-auto p-2 button-right"
      v-if="showButton == (User.id == comment.UserId || User.isAdmin == 1)">
      <span></span>
        <button class="btn btn-light dropdown-toggle me-5" type="button"
          id="defaultDropdown1" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
        </button>
      <ul class="dropdown-menu" aria-labelledby="defaultDropdown">
        <li>
          <button class="dropdown-item" data-bs-toggle="modal" data-bs-target="#commentModal" data-bs-whatever="@mdo"
            v-if="showButton == (User.id == comment.UserId)" @click="showModal(comment)">
             Modifier le commentaire
          </button>
        </li>
        <li>
          <button class="dropdown-item" @click="_deleteComment" v-if="
            showButton == (User.id == comment.UserId || User.isAdmin == 1)">
            Supprimer le commentaire
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Comment",
  props: ["comment"],
  data() {
    return {
      showButton: true,
      commentMidalId: null,
    };
  },
  methods: {
    _deleteComment: function () {
      const dynamicId = this.comment.id;
      this.$store.dispatch("deleteComment", { dynamicId });
    },
    showModal(comment) {
      // Le paramètre va lui dire que c'est ce comment là
      this.$store.dispatch("comment", comment);
    },
  },
  computed: {
    //  getting the current user via the state by mapGetters
    ...mapGetters(["User"]),
  },
};
</script>