<template>
  <div class="card rounded mb-5 d-flex flex-column">
    <div class="post-Write">
      <!--#############addImage################-->
      <label class="addImage">         
          <span  class="title-image">image </span>
          <input type="file" id="FileInput"
         ref="image" name="image_attachment_upload"
         v-on:change="handleFileUpload()"/>
      </label>
    </div>
    <div class="input-group">
      <main class="col-sm-5 col-md-6">
        <textarea class="form-control" v-model="publication" type="text" placeholder="Publier ici..." aria-label="publication" id="publication">
        </textarea>
      </main>
    </div> 
    <div>
      <button class="btn btn-primary btn-icon-text btn-edit-profile"
        @click="createPost" :disabled="!publication && !image">
         Publier
      </button>
    </div>

        <div class="p-2 mb-3">
          <section v-if="preview">
            <img :src="preview" class="img-fluid" />
            <div class="d-flex">
              <p class="mb-0 mt-2">file name: {{ image.name }}</p>
              <button class="trash mt-1 ms-5"
                @click="resetImage" size="2x" for="imageFile">
              </button>
            </div>
          </section>
        </div>      
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'postWrite',
    data(){
      return{
         id:'',
         publication:'',
         image:'',
         preview:'',
         likes:'',
         User: {},
         UserId: ''
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
    createPost(){
      const publication = this.publication;
      const image = this.image;
      const likes = this.likes;
      const userId = this.userId;
      console.log(image+"**************");
      this.$store.dispatch("createPost", { publication, image, likes, userId });
      this.image = null;
      this.preview = null;
      this.publication = "";
      this.likes= 0;
    }
  },
    computed: {
    ...mapState(["user", "post"]),
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card{
  background: #FDEDEC;
  margin: auto;
  width: 70%;
  padding: 10px;
  height: auto;
}
.btn{
  width: 120px;
}
.addImage {
  margin: auto;
  padding: 10px;
  margin-right: 150px;
  
}
.addImage span{
  cursor: grab;
  padding: 19px 16px;
  color:white;
  border-radius: 10px;
  background: rgb(253, 200, 200); 
}
.addImage input{
  position: absolute;
  top: 0; left: 0;  
  opacity: 0;
}
textarea{
  height: 80px;
  margin-left: 30%; 
  margin-top: 10px;
}
@media (max-width: 768px){
.card{
  width: 95%;
  height: auto;
}
.btn{
  width: 80px;
}
.addImage {
  margin: auto;
  padding: 10px;
  margin-right: 50px;
}
.addImage span{
  cursor: grab;
  padding: 15px 10px;
  color:white;
  border-radius: 10px;
  background: rgb(253, 200, 200); 
}
.addImage input{
  position: absolute;
  top: 0; left: 0;  
  opacity: 0;
}
textarea{
  height: 60px;
  margin: 10px;
}
.btn{
  width: 80px;
}
}
</style>
