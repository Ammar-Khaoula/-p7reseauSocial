<template>
  <div class="card rounded mb-5">
   <section class="card-header">
    <div class="d-flex flex-column">
      <!--#############addImage################-->
       <label class="addImage">         
          <span  class="title-image">Ajouter une image </span>
          <input type="file" id="FileInput"
         ref="image" name="image_attachment_upload"
         v-on:change="handleFileUpload()"/>
        </label>
        <!--<div class="input-group input-group-sm mb-3 mt-3 d-flex flex-row justify-content-start">-->
      <main class="col-sm-5 col-md-8 from_input">
        <input class="form-control mr-sm-2 bg-light" v-model="publication" type="text" placeholder="Publier ici..." aria-label="publication" id="publication"/>
      </main>
    </div> 
        <div>
          <button class="btn btn-primary btn-icon-text btn-edit-profile"
            @click="createPost" :disabled="!publication && !image">
              Publier
          </button>
        </div>

        <div class="p-2 mb-3">
          <template v-if="preview">
            <img :src="preview" class="img-fluid" />
            <div class="d-flex">
              <p class="mb-0 mt-2">file name: {{ image.name }}</p>
              <button class="trash mt-1 ms-5"
                @click="resetImage" size="2x" for="imageFile">
              </button>
            </div>
          </template>
        </div>
      
    </section>   
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
         like:'',
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
      const like = this.like;
      const userId = this.userId;
      console.log(image+"**************");
      this.$store.dispatch("createPost", { publication, image, like, userId });
      this.image = null;
      this.preview = null;
      this.publication = "";
      this.like= 0;
    }
  },
    computed: {
    ...mapState(["user", "post"]),
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-header{
  background: #FDEDEC;
  width: 80%;
  height: 280px;
  margin-left: 10%;
}
.btn{
  position: relative;
  bottom: 40px;
  width: 120px;
}
.addImage span{
  position: relative;
  top: 30px;
  border: 3px #E74C3C solid;
  border-radius: 20px;
  padding: 30px 10px;
  background: #F5B7B1;
}
#FileInput{
  opacity: 0;
}
input{
  position: relative;
  bottom: 50px;
  margin-left: 10%;
  height: 120px;
  width: 600px;
}

</style>
