<template>
  <div class="modal fade" id="postModal" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
          </button>
        </div>
        <div>
          <label id="postModal" for="message-text" class="col-form-label">
            Modifiez votre post ici :</label>
          <div id="postModal" class="d-flex justify-content-center">
            <div class="input-group input-group-sm mb-3 mt-3 d-flex flex-row justify-content-start">
              <!-- image -->
              <img class="rounded-circle img-xs" src="../assets/icon.png" alt="" style="width:200px; height:200px;"/>
              
              <div class="col-sm-5 col-md-8 ms-3">
                <input class="form-control mr-sm-2 bg-light"
                      v-model="publication"
                     :maxlength="max"
                      type="text"
                     ref="resetInput" 
                     placeholder="Publier ici..." 
                     aria-label="publication" 
                     id="publication"/>
                  
              </div>
              <!-- add button here -->
   <label class="addImage">
    <span class="title-image">Ajouter image</span>
    <input accept="image/*" type="file" id="FileInput" ref="image"
      name="image_attachment_upload" v-on:change="handleFileUpload()"/>
  </label>
</div>
</div>
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

  <!--<div class="pub_post" v-if="post"> 
        <p class="mb-3 tx-14 ms-3">
         {{ post.id }} -- {{ post.publication }}
          
        </p>  
        <a class="aCursor" data-bs-toggle="modal" data-bs-target="#postModalImage"
          data-bs-whatever="@mdo" 
          v-if="post.imageUrl">
          <img class="rounded mx-auto d-block" :src="post.imageUrl" alt="Image de Post"/>
        </a>
      </div>-->

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary"
            data-bs-dismiss="modal" @click="closedButton()">
            Close
          </button>
        <div>
            <button class="btn btn-primary btn-icon-text btn-edit-profile"
              @click="_updatePost" :disabled="!publication && !image"
              data-bs-dismiss="modal">
              Republier
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
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
        console.log(this.post +" ppp===***** "+publication);
      const image = this.image;
      
      const dynamicId = this.post.id;
      console.log("id ===***** "+dynamicId);
      this.$store.dispatch("updatePost", { publication, image, dynamicId });
      this.$refs["resetInput"].value = "";
    },
    //updatePost
  },
  computed: {
    //  getting the current user via the state by mapGetters
    ...mapState(["user", "posts", "post"]),
  },
};

</script>