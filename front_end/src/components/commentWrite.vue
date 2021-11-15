<template>
    <body class="d-flex flex-column">
      <section class="input-group input-group-sm mb-1 mt-3 d-flex flex-row justify-content-start border-bottom border-light border-2">
        <img class="rounded-circle img-xs" src="../assets/icon.png" alt="" style="height: 150px;"/>
        <div class="col-sm-6 col-md-9">
        <input class="form-control mr-sm-2 bg-light" v-model="comment"
          :maxlength="max" type="text" placeholder="Commenter..." aria-label="Commenter" id="commentText"/>
        </div>
      <!-- add button here </AddImageButton>-->
       <label class="addImage">
         <i class="far fa-image-polaroid"></i>
         <span class="title-image">Ajouter image</span>
         <input accept="image/*" type="file" id="FileInput" ref="image" name="image_attachment_upload" v-on:change="handleFileUpload()"/>
       </label>
      <!-- add button end here -->
      <div>
        <button class="btn btn-primary btn-icon-text btn-edit-profile" @click="create_comment"
          :disabled="!comment && !image">
              Publier
        </button>
      </div>
      </section>
      <div class="p-2 mb-3">
        <section v-if="preview">
          <img :src="preview" class="img-fluid" />
            <div class="d-flex">
              <p class="mb-0 mt-2">file name: {{ image.name }}</p>
             <button class="trash mt-1" @click="resetImage" size="2x" for="imageFile">
             </button>
            </div>
        </section>
      </div>
    </body>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'commentWrite',
  props: ["postId"],
  data() {
    return {
      comment: "",
      image: "",
      max: 280,
      preview: "",
    };
  },
  methods: {
    handleFileUpload() {
      let input = event.target;
      console.log(input);
      if (input.files) {
        console.log("inside condition");
        let reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
          console.log("assign preview", this.preview);
        };
        this.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
        console.log("end");
      }
    },
    create_comment: function () {
      const commentaire = this.comment;
      const image = this.imageUrl;
      const postId = this.postId;
      this.$store.dispatch("createComment", { commentaire, image, postId });
      this.image = null;
      this.preview = null;
      this.comment = "";
    },
    resetImage: function () {
      this.image = null;
      this.preview = null;
    },
  },
   computed: {
   
    ...mapState(["user"]),
  },
}
</script>