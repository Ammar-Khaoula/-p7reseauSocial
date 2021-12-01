<template>
  <section>
    <HelloWorld/>
      <div class="edit-compte">
            <h3>
              Paramètres généraux du compte
            </h3>

     <div class="d-flex justify-content-between border-bottom edit-row edit-row--transition">
              <div class="ml-2 d-flex">
                <span class="mt-3 mb-3">photo:</span>
              </div>
                <div class="ml-2 d-flex">
                  <span class="mt-3 mb-3">{{ user.imagesURL }}</span>
              </div>
                <div class="ml-2 d-flex">
                <div class="col-sm-6 col-md-9 mt-2">
                  <input class="form-control mr-sm-2 bg-light"
                    v-on:change="handleFileUpload()" type="file"/>
                </div>
              </div>
              </div>

            <div class="d-flex justify-content-between border-bottom edit-row edit-row--transition">
              <div class="ml-2 d-flex">
                <span class="mt-3 mb-3">Prénom:</span>
              </div>
                <div class="ml-2 d-flex">
                  <span class="mt-3 mb-3">{{ user.first_name }}</span>
              </div>
                <div class="ml-2 d-flex">
                <div class="col-sm-6 col-md-9 mt-2">
                  <input class="form-control mr-sm-2 bg-light"
                    v-model="first_name" :maxlength="max" type="text" placeholder="Edit" aria-label="Edit"/>
                </div>
              </div>
              </div>

               <div class="d-flex justify-content-between border-bottom">
                <div class="ml-2 d-flex">
                  <span class="mt-3 mb-3">Nom:</span>
               </div>
                <div class="ml-2 d-flex">
                  <span class="mt-3 mb-3">{{ user.last_name }}</span>
                </div>
                  <div class="ml-2 d-flex">
                    <div class="col-sm-6 col-md-9 mt-2">
                      <input class="form-control mr-sm-2 bg-light" v-model="last_name"
                        :maxlength="max" type="text" placeholder="Edit" aria-label="Edit"/>
                    </div>
                  </div>
                  </div>
                    <div class="d-flex justify-content-between border-bottom">
                      <div class="ml-2 d-flex">
                        <span class="mt-3 mb-3">Pseudeo:</span>
                    </div>
                    <div class="ml-2 d-flex">
                        <span class="mt-3 mb-3">{{ user.bio }}</span>
                    </div>
                    <div class="ml-2 d-flex">
                     <div class="ml-2 d-flex">
                      <div class="col-sm-6 col-md-9 mt-2">
                        <input class="form-control mr-sm-2 bg-light"
                         v-model="bio" :maxlength="max"
                          type="text" placeholder="Edit" aria-label="Edit"/>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="d-flex justify-content-between border-bottom">
                        <div class="ml-2 d-flex">
                          <span class="mt-3 mb-3">Email:</span>
                        </div>
                        <div class="ml-2 d-flex">
                          <span class="mt-3 mb-3">{{ user.email }}</span>
                        </div>
                        <div class="ml-2 d-flex">
                            <div class="col-sm-6 col-md-9 mt-2">
                              <input class="form-control mr-sm-2 bg-light"
                                :maxlength="max" type="email"
                                v-model="email" placeholder="Edit" aria-label="Edit"/>
                            </div>
                          </div>
                      </div>
                      <div class="d-flex justify-content-between border-bottom">
                        <div class="ml-2 d-flex">
                          <span class="mt-3 mb-3">Password:</span>
                        </div>
                        <div class="ml-2 d-flex">
                          <div class="ml-2 d-flex">
                            <div class="col-sm-6 col-md-9 mt-2">
                              <input class="form-control mr-sm-2 bg-light"
                                type="password" v-model="password" placeholder="Edit" aria-label="Edit"/>
                            </div>
                          </div>
                        </div>
                      </div>
             <div class="d-flex justify-content-around">
                <button
                  class="btn btn-danger btn-icon-text btn-edit-profile d-flex justify-content-center"
                  @click="_deleteUser">
                    Supprimer compte
                </button>
                  <button class="btn btn-primary btn-icon-text btn-edit-profile"
                   @click="_updateUser">
                    Edit
                </button>
              </div>
      </div>          
  </section>
</template>

<script>
import { mapState} from "vuex";
import HelloWorld from '../components/HelloWorld.vue'
export default {
  name: "Home",
  components: {
    HelloWorld
  },
  data() {
    return {
      first_name: "",
      last_name: "",
      bio: "",
      email: "",
      imagesURL: "",
      password: "",
      preview:'',
      max: 50,
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

    toUpdate() {
      this.$router.push({ name: "updateProfil" });
    },
    _deleteUser: function () {
      //const dynamicId = this.user.id;
      //console.log("user==== : "+dynamicId);
      // const clearToken = localStorage.clear("userToken");
      this.$store
        .dispatch("deleteUser")
        .then((response) => {
          console.log("user suprimer !!! "+response);
          if (response) {
            this.$router.push('/');
          }
        })
        .catch((error) => {
          console.log("ereurrrrrrrrr: "+ error);
        });
    },
    // createUpdatePost
    _updateUser: function () {
      const thisFirst_name = this.first_name;
      const thisLast_name = this.last_name;
      const thisBio = this.bio;
      const thisImage = this.imagesURL;
      const thisEmail = this.email;
      const thisPassword = this.password;
      const thisIsAdmin = this.isAdmin;
      this.$store
        .dispatch("updateUser", {
          thisFirst_name,
          thisLast_name,
          thisBio,
          thisEmail,
          thisImage,
          thisPassword,
          thisIsAdmin
        })
        .then((response) => {
          console.log(response);
          this.$router.push({ name: "Home" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    ...mapState(["user", "post", "posts", "comment", "comments"]),
  },
};
</script>
<style scoped>
 .edit-compte{
   background: #fdd9d5;
   margin: auto;
   padding: 10px;
   width: 60%;
   margin-bottom: 50px;
   border-radius: 25px;
 }
 h3{
   margin-left: 50px;
   font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
   font-weight: bolder;
 }
 .btn-primary{
   width: 150px;
 }
 @media (max-width: 768px){
  .edit-compte{
    width: 90%;
    margin-bottom: 10px;
 }
 h3{
   margin-left: 10px;
   font-family: serif;
   font-weight:normal;
   font-size: 12px;
 }
 .btn-primary{
   width: 80px;
 }
 }
</style>

