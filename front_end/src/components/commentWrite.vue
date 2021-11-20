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
         <span class="title-image">Ajouter image</span>
         <input accept="image/*" type="file" id="FileInput" ref="image" name="image_attachment_upload"
          v-on:change="handleFileUpload()"/>
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
      id:'',
      comment: "",
      image: "",
      max: 280,
      preview: "",
      userId:''
    };
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
    create_comment: function () {
      const comment = this.comment;
      const image = this.image;
      const userId = this.UserId;
      const postId = this.postId;
      console.log(this.image+"***************url :"+image );
      this.$store.dispatch("createComment", { comment, image, userId, postId });
      this.image = null;
      this.preview = null;
      this.comment = "";
    },
  },
   computed: {
   
    ...mapState(["user"]),
  },
}
</script>
<style scoped>
#FileInput{
  opacity: 0;
}
.addImage span{
 border: 2px #85C1E9 solid;
 background: #f8b0a7;
 border-radius: 20px;
 position: relative;
 left: 160px;
 bottom: 100px;
 padding: 10px;
}
</style>