<template>
  <section class="modal fade" id="postModal" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
          </button>
        </div>
        <div>
          <div id="postModal" class="d-flex justify-content-center">
            <div class="input-group input-group-sm mb-3 mt-3 d-flex flex-row justify-content-start">
              <div class="col-sm-5 col-md-8 ms-3">
                <input class="form-control mr-sm-2 bg-light"
                    v-model="publication"
                    :maxlength="max"
                    type="text"
                    ref="resetInput" 
                    placeholder="Republier ici..." 
                    aria-label="publication" 
                    id="publication"/>
                  
              </div>
              <!--*************images********* -->
        <label class="addImage">
           <span class="title-image">Image</span>
           <input accept="image/*" type="file" id="FileInput" ref="image"
           name="image_attachment_upload" v-on:change="handleFileUpload()"/>
        </label>
  </div>
    </div>
    <!--*************images********* -->
      <div class="p-2 mb-3">
        <main v-if="preview">
            <img :src="preview" class="img-fluid" />
          <div class="d-flex">
             <p class="mb-0 mt-2">file name: {{ image.name }}</p>
          </div>
        </main>
      </div>  
   </div>
       <div class="modal-footer">
          <button type="button" class="btn btn-secondary"
            data-bs-dismiss="modal" @click="closedButton()">
            Close
          </button>
        <div>
            <button class="btn btn-primary btn-icon-text btn-edit-profile"
              @click="_updatePost()" :disabled="!publication && !image"
              data-bs-dismiss="modal">
              Republier
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "updatePost",

  data() {
    return {
      publication: "",
      image: "",
      max: 280,
      preview: "",
      likes: 0,
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

    _updatePost: function () {
      const publication = this.publication;
      const image = this.image;
      const likes= this.likes;
      this.$store.dispatch("updatePost", { publication, image, likes });
      this.$refs["resetInput"].value = "";
    },
    
  },
  computed: {
    ...mapState(["user", "post"]),
  },
};
</script>
<style scoped>
.addImage {
  margin: auto;
  padding: 10px;
  
}
.addImage span{
  cursor: grab;
  padding: 19px 10px;
  color:white;
  border-radius: 10px;
  background: rgb(253, 200, 200); 
}
.addImage input{
  position: absolute;
  top: 0; left: 0;  
  opacity: 0;
}
.modal-content{
  background: #FDEDEC;
}
.modal-header{
  background: #fad4d4;
}

@media (max-width: 768px){
.addImage span{
  padding: 5px 7px; 
}
}
</style>