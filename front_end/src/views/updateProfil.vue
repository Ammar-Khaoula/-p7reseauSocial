<template>
  <section>
    <HelloWorld/>
    <!-- <Home></Home> bg -->
    <div class="container">
      <div class="profile-page tx-13">
        <div class="row profile-body d-flex flex-row justify-content-center ms-5">
          <div class="col-xl-6 middle-wrapper">
            <div class="row mt-2 mt-md-2 mt-lg-0">
              <div class="col-md-12">
                <div class="card rounded">
                  <div class="card-header">
                    <div class="d-flex flex-column justify-content-start">
                      <div class="d-flex justify-content-start border-bottom">
                        <div class="ml-2 d-flex me-3">
                          <h3 class="mt-3 mb-3 h5">
                            Paramètres généraux du compte
                          </h3>
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
                            <input
                              class="form-control mr-sm-2 bg-light"
                              v-model="first_name" :maxlength="max" type="text" placeholder="Edit" aria-label="Edit"/>
                          </div>
                        </div>
                        <div class="mt-2">
                          <button class="btn btn-primary btn-icon-text btn-edit-profile"
                            @click="_updateUser">
                            Edit
                          </button>
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
                          <div class="ml-2 d-flex">
                            <div class="col-sm-6 col-md-9 mt-2">
                              <input class="form-control mr-sm-2 bg-light" v-model="last_name"
                                :maxlength="max" type="text" placeholder="Edit" aria-label="Edit"/>
                            </div>
                          </div>
                        </div>
                        <div class="mt-2">
                          <button class="btn btn-primary btn-icon-text btn-edit-profile"
                            @click="_updateUser">
                            Edit
                          </button>
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
                        <div class="mt-2">
                          <button class="btn btn-primary btn-icon-text btn-edit-profile"
                            @click="_updateUser">
                            Edit
                          </button>
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
                          <div class="ml-2 d-flex">
                            <div class="col-sm-6 col-md-9 mt-2">
                              <input class="form-control mr-sm-2 bg-light"
                                :maxlength="max" type="email"
                                v-model="email" placeholder="Edit" aria-label="Edit"/>
                            </div>
                          </div>
                        </div>
                        <div class="mt-2">
                          <button class="btn btn-primary btn-icon-text btn-edit-profile"
                            @click="_updateUser">
                            Edit
                          </button>
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
                        <div class="mt-2">
                          <button class="btn btn-primary btn-icon-text btn-edit-profile"
                            @click="_updateUser">
                            Edit
                          </button>
                        </div>
                      </div>

                      <div class="mt-2 mb-2">
                        <button
                          class="btn btn-danger btn-icon-text btn-edit-profile d-flex justify-content-center"
                          @click="_deleteUser">
                          Supprimer compte
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- middle wrapper end -->
        </div>
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
      password: "",
      max: 50,
    };
  },
  // Logique pour pouvoir aller vers la page update si on clique update
  methods: {
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
          console.log(response);
          if (response) {
            this.$router.push({ name: "Login" });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // createUpdatePost
    _updateUser: function () {
      const thisFirst_name = this.first_name;
      const thisLast_name = this.last_name;
      const thisBio = this.bio;
      const thisEmail = this.email;
      const thisPassword = this.password;
      this.$store
        .dispatch("updateUser", {
          thisFirst_name,
          thisLast_name,
          thisBio,
          thisEmail,
          thisPassword,
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
  // Logique pour récuperer les datas depuis la base de données MySQL
  computed: {
    //  getting the current user via the state by mapGetters
    ...mapState(["user", "post", "posts", "comment", "comments"]),
  },
};
</script>
