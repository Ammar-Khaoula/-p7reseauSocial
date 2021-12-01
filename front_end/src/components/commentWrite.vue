<template>
  <body class="comment-write d-flex flex-column">
    <div class="d-flex ">
      <div class="col-sm-6 col-md-9">
         <textarea class="form-control mr-sm-2 bg-light" v-model="comment"
          type="text" placeholder="Commenter..." aria-label="Commenter" id="commentText">
         </textarea>
      </div>
      <div>
       <label class="addImage">
         <span class="title-image">Image</span>
         <input accept="image/*" type="file" id="FileInput" ref="image" name="image_attachment_upload"
          v-on:change="handleFileUpload()"/>
       </label>
      </div>
    </div>
        <div>
          <button class="btn btn-primary btn-icon-text btn-edit-profile" @click="create_comment"
            :disabled="!comment && !image">
              Publier
          </button>
        </div>
      

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
.comment-write{
  background: rgb(253, 230, 230);
  border-top: 2px rgb(248, 159, 159) solid;
  border-bottom: 2px rgb(248, 159, 159) solid;
  height: auto;
}
.addImage {
  position: relative;
  right: 75px;
  margin-top: 38px;
}
.addImage span{
  cursor: grab;
  padding: 19px 16px;
  color:white;
  border-top-right-radius: 28px;
  border-bottom-right-radius: 25px;
  background: rgb(253, 200, 200); 
}
.addImage input{
  position: absolute;
  top: 0; left: 0;  
  opacity: 0;
}
textarea{
  height: 60px;
  border-radius: 30px;
  margin: 20px;
  margin-left: 100px;
  padding: 10px;
  width: 80%;
}
.btn-edit-profile{
  width: 80px;
  height: 50px;
}
@media(max-width: 768px) {
.addImage {
  position: relative;
  right: 71px;
  bottom: 20px;
}
.addImage span{
  padding: 9px;
}
textarea{
  height: 40px;
  margin: 10px;
  padding: 10px;
  width: 230px;
}
.btn-edit-profile{
  width: 70px;
  height: 30px;
  padding-bottom: 30px;
  margin-right: 120px;
}
}
</style>