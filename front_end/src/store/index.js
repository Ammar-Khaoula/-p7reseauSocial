import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
let ls = new SecureLS({ isCompression: false });
const axios = require('axios');
const instance = axios.create({
  baseURL: 'http://localhost:5000/api/'
});

let user = localStorage.getItem('user');
let userId = null;
if (!user) {
  user = {   
    userId: -1,
    token: '',
    isAdmin: '',
  };
} else {
  try {
    console.log("************debut***********");
    user = JSON.parse(user);
    userId = user.userId;
    console.log("user id========= " + user);
    instance.defaults.headers.common['Authorization'] = user.token;
    } catch(ex) {
      user = {
        userId: -1,
        token: '',
        isAdmin: '',
      };
   }
}


//create un store
export default createStore({
  //################### state ##############
  state: {
    status: '',
    user: {},
    users: null,
    posts: [],
    commentaire: null,
    commentaires: [],
    createdAt: Date,
    token: '',
    userInfo: {
      id: '',
      isAdmin: '',
      first_name: '',
      last_name: '',
      email: '',
      bio: '',
      imagesURL: '',
    },
    post: {
      id: '',
      publication: '',
      imageUrl: '',
      createdAt: Date,
      likes: 0,
      UserId: '',
    },
  },
  plugins: [
    createPersistedState({
      key: "keyname",
      paths: window.localStorage,
      getItem: (key) => ls.get(key),
      setItem: (key, value) => ls.set(key, value),
      removeItem: (key) => ls.removeAll(key),
      expires: 1, // 24 heures
    }),
  ],
 //################### mutation ##############
  mutations: {
    setStatus: function (state, status) {
      state.status = status;
    },
    logUser: function (state, user) {
      instance.defaults.headers.common['Authorization'] = user.token;
      localStorage.setItem('user', JSON.stringify(user));
      console.log("=====================" +localStorage.getItem('user'));
      state.user = user;
    },
    userInfo: function (state, userInfo) {
      state.userInfo = userInfo;
    },
    users: function (state, users) {
      state.users = users;
    },

  post(state, posts) {
      state.posts = posts;
    },
  commentaire(state, commentaires) {
      state.commentaire = commentaires;
    },
    
	ADD_USERSLIKED_TO_POST(state){
		const usersLiked = [];
    const posts = state.posts;
    console.log(posts)
		posts.forEach(post => {
			if (!post.usersLiked) {
				const index = state.posts.indexOf(post);
				post = { ...post, usersLiked};
				state.posts.splice(index, 1, post);
			}
		});
	},
	ADD_NEW_POST(state, post) {
		const usersLiked = [];
		post = { ...post, usersLiked};
		state.posts = { post, ...state.posts };
    },
  update_post(state, post) {
      for (let i = 0; i < state.posts.length; i++) {
        if (state.posts[i].id == post.id) {
          console.log(state.posts[i].publication, "==", post.publication);
          state.posts[i].publication = post.publication;
          state.posts[i].imageUrl = post.imageUrl;
          state.posts[i].updatedAt = post.updatedAt;
        }
      }
  },

_deletePost(state, post) {
    let index = 0;
      for (let postFind of state.posts) {
        if (postFind.id == post.id) {
          state.posts.splice(index, 1);
          // console.log(postFind.splice(post));
        }
        index++;
      }
},
deleteComment(state, commentaire) {
  let index = 0;
    for (let commentFind of state.commentaires) {
      if (commentFind.id == commentaire.id) {
        console.log("--------debut delete----------");
            state.commentaires.splice(index, 1);
          }
          index++;
        }     
    },
    updateComment(state, commentaire) {
      for (let i = 0; i < state.commentaires.length; i++) {
        if (state.commentaires[i].UserId == commentaire.id) {
          console.log(state.commentaires[i].comment, "==", commentaire.comment);
          state.commentaires[i].comment = commentaire.comment;
          state.commentaires[i].imageUrl = commentaire.imageUrl;
          state.commentaires[i].updatedAt = commentaire.updatedAt;
        }
      }
  },

	LIKE_POST(state, posts) {
		state.posts = posts;
    },
  addComment(state, commentaire) {
      state.commentaire = commentaire;
  },
   CLEAR_STORE(state) {
        state.posts = [],
        state.user = {},
        state.createdAt = Date,
        state.token = ''
      //state.allUsers = [],
      //state.userLogged = false
    }
  },
 //################### actions ##############
  actions: {
    login: ({ commit }, userInfo) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
      instance.post('/auth/login', userInfo)
        .then(function (response) {
        commit('setStatus', '');
          commit('logUser', response.data);
          resolve(response);
      })
        .catch(function () {
          commit('setStatus', 'error_login');
        reject();
      });
      });
      
    },
    signUp: ({ commit }, userInfo) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        commit;
      instance.post('/auth/signup', userInfo)
        .then(function () {
          commit('setStatus', 'created');
          resolve();
      })
        .catch(function () {
          commit('setStatus', 'error_signup');
        reject();
      });
    }) ;  
    },
  //---------------get all users------------
    getAllUser: ({ commit }) => {
      commit;
      console.log("heloooooooooo tous les utilisateut");
      instance
        .get('/profile/')
        .then(function (response) {
          commit('userInfo', response.data.users);
          console.log('all usres ====' + response.data.users.length);
          window.location.reload();
          })
          .catch(function (error) {
            console.log('Erreur ----------------'+error);
      })
    },
  //----------- get user by id------------------
    getUserById: ({ commit }, post) => {
      commit;
      let id = null;
      if (post == null)
      {
        console.log("user de la session est : " + userId);
      if (!userId) {
        userId = localStorage.getItem('user').userId;
        console.log("l'utilisateur a été null " + userId);
      }
        id = userId;
      } else {
        console.log("dynamic user " + post.dynamicId);
        id = post.dynamicId;
      }
      console.log("************l'id est******" + id);
      const getUserProfil = `/profile/me/${id}`;     
    instance
      .get(getUserProfil)
      .then((response) => {
        commit('userInfo', response.data);
        console.log("name : "+response.data.first_name)
       // window.location.reload();
      })
      .catch((error) => {
        console.log("ereur : "+error);
      });
    },
     // ##########importer tous les posts##########
    getPostById({ commit }, post) {
      console.log("++getPostById+++"+ post.dynamicId);
      const getPost = `/postes/post/${post.dynamicId}`;
      instance.get(getPost)
        .then((response) => {
          commit("post", response.data.posts);
          //window.location.reload();
        })
        .catch((error) => {
          console.log('ereur ereur ereur: '+error);
    });
    },
    //""""""""""""""""""""""""getALLpost"""""""""""
     getAllPost({ commit }) {
      instance.get('/postes/')
        .then((response) => {
          commit("post", response.data.posts);
          commit('ADD_USERSLIKED_TO_POST');
         // window.location.reload();
        })
        .catch((error) => {
          console.log('ereur ereur ereur: '+error);
    });
  },
// ########"""get My du post############
  getAllMyPost({ commit }, post) {
        let id = null;
        if (post == null)
        {
          console.log("user de la session est : " + userId);
        if (!userId) {
          userId = localStorage.getItem('user').userId;
          console.log("l'utilisateur a été null " + userId);
        }
          id = userId;
        } else {
          console.log("dynamic user " + post.dynamicId);
          id = post.dynamicId;
        }
        console.log("************l'id est******" + id);

        const getAllMyPost = `/postes/${id}`;
        return new Promise((resolve, reject) => {
          instance
            .get(getAllMyPost)
            .then((response) => {
              console.log(response);
              // posts.thisMyPosts = response.data.myPost;
              console.log("Recuperer mes posts");
              commit("post", response.data.myPosts);
              console.log("length : " + response.data.myPosts.length);
              resolve(response);
             //window.location.reload();
            })
            .catch((error) => {
              console.log(error);
              reject(error);
            });
        });
      },
    // ########"""Creation du post############
    createPost({ commit }, post) {
      console.log("create post avec l'utilisateur " + userId);
      if (!userId)
      {
        userId = localStorage.getItem('user').userId;
        console.log("l'utilisateur a été null " + userId);
      }
      let formData = new FormData();
      formData.append("publication", post.publication);
      formData.append("image", post.image);
      formData.append("likes", post.likes);
      formData.append("userId", userId);
      console.log("********create post********")
      const createPost = "/postes/";
      return new Promise((resolve, reject) => {
        instance.post(createPost, formData)
          .then((response) => {
            commit("ADD_NEW_POST", response.data.post);
            resolve(response);
            window.location.reload();
          })
          .catch((error) => {
            console.log("Erreur : "+error);
            reject(error);
          });
      });
    },
    //----------suprimer un post---------
    deletePost({ commit }, post) {
      console.log("supprimer le  post : "+post.dynamicId+" de l'utilisateur " + userId);
      if (!userId)
      {
        userId = user.userId;
        console.log("l'utulisateur a été null " + userId);
      }
      let formData = new FormData();
      formData.append("userId", userId);
      const confirmDelete = confirm("Êtes vous sûr de vouloir supprimer ce post ?");
     
      const deletePost = `/postes/${post.dynamicId}`;

      if (confirmDelete) {
        console.log("********supprimer post********")
        return new Promise((resolve, reject) => {
          instance
            .delete(deletePost, formData)
            .then((response) => {
              commit("_deletePost", response.data.post);
              resolve(response);
              window.location.reload();
            })
            .catch((error) => {
              console.log("Error : "+error);
              reject(error);
            });
        });
      }
    },
    //-----------modifier un post---------
    updatePost({ commit }, post) {
      console.log("modifier post avec l'utilisateur " + post.id);
      let formData = new FormData();
      formData.append("publication", post.publication);
      formData.append("imageUrl", post.image);
      formData.append("likes", post.likes);
      formData.append("userId", post.dynamicId);
      console.log("********modifier post********")
      const createUpdatePost = `/postes/${post.dynamicId}`;
      console.log('UpdatePost'+createUpdatePost)
        instance
          .put(createUpdatePost, formData)
          .then((response) => {
            commit("update_post", response.data.post);
            //window.location.reload();
          })
          .catch((error) => {
            console.log('ereuur'+error);
          });
    },
  // ------------- creer un commentaire-----
    createComment({ commit }, commentaire) {
      console.log("crée de commentaire sur le post "+commentaire.postId+" l'utilisateur " + userId);
      if (!userId)
      {
        userId = user.userId;
        console.log("l'utulisateur a été null " + userId);
      }
      let formData = new FormData();
      formData.append("comment", commentaire.comment);
      formData.append("image", commentaire.image);
      formData.append("userId", userId);
      formData.append("postId", commentaire.postId);
      const createComment = `/comment/${commentaire.postId}`;
      return new Promise((resolve, reject) => {
        instance
          .post(createComment, formData)
          .then((response) => {
            console.log("Hey::", response.data.comment);
            commit("addComment", response.data.comment);
            resolve(response);
           //window.location.reload();
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },
    //############"" getAll commentaire############
    getAllcommentaire({ commit}) {
      instance
        .get('/comment/')
        .then((response) => {
          console.log("GetAllComment: " + response.data.comment);
          commit("commentaire", response.data.comment);
         // window.location.reload();
        })
        .catch((error) => {
          console.log('ereur ereur ereur: ' + error);
        });
    },
    //************************modifier commentaire************ */
  /*  updateComment({ commit }, commentaire) {
      console.log("modifier commentaire avec l'utilisateur " + userId);
      if (!userId)
      {
        userId = user.userId;
        console.log("l'utulisateur a été null " + userId);
      }
      let formData = new FormData();
      formData.append("image", commentaire.image);
      formData.append("comment", commentaire.comment);
      formData.append("userId", userId);
      const updateComment = `/comment/${commentaire.dynamicId}`;
      return new Promise((resolve, reject) => {
        instance
          .put(updateComment, formData)
          .then((response) => {
            console.log(response.data);
            commit("updateComment", response.data);
            resolve(response);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },*/
    //************************suprimer commentaire************ */
    deleteComment({ commit }, commentaire) {
      console.log("supprimer le  commentaire : "+commentaire.dynamicId+" et l'utilisateur " + userId);
      if (!userId)
      {
        userId = user.userId;
        console.log("l'utulisateur a été null " + userId);
      }
      let formData = new FormData();
      formData.append("userId", userId);
      const confirmDelete = confirm("Êtes vous sûr de vouloir supprimer ce commentaire ?");
    
      const deleteComment = `/comment/${commentaire.dynamicId}/${userId}`;
      if (confirmDelete) {
        console.log("*****suprimer commentaire******");
        return new Promise((resolve, reject) => {
          instance
            .delete(deleteComment, formData)            
            .then((response) => {
              console.log(response.statusCode+"----------debut delete-----------");
              commit("deleteComment", response.data.comment);
              console.log("----------l'utilisateur a ete suprimer-----------");
              resolve(response);
              window.location.reload();
            })
            .catch((error) => {
               // how read code error 
             // if (error.message.includes("403"))
               // alert("tu pas authoriser pour suprimer ce commentaire" )
              console.log("++++Error : " +error.message);
              reject(error);
            });
        });
      }
      
    },
    //-----------modifier mon compte----------
    updateUser({ commit }, user) {
      if (!userId)
      {
        userId = user.userId;
        console.log("l'utulisateur a été null " + userId);
      }
      const updateUser = `/profile/me/${userId}`;
      console.log("======= "+updateUser)
      return new Promise((resolve, reject) => {
        instance
          .put(updateUser, {
            first_name: user.thisFirst_name,
            last_name: user.thisLast_name,
            bio: user.thisBio,
            image: user.thisImagesURL,
            email: user.thisEmail,
            password: user.thisPassword,
            isAdmin: user.thisIsAdmin
          })
          .then((response) => {
            commit("userInfo", response.data.user);
            resolve(response);
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },
    //---------suprimer un post--------
    deleteUser({ commit }, user) {
      console.log("user id a supprimer : " + userId);
      if (!userId)
      {
        userId = user.userId;
        console.log("l'utulisateur a été null " + userId);
      }
      const confirmDelete = confirm(
        "Êtes vous sûr de vouloir supprimer votre compte ?"
      );
      console.log("=============== debut delete user========");
      if (confirmDelete) {
        const deleteUser = `/profile/me/${userId}`;
        // const clearToken = localStorage.clear("userToken");
        return new Promise((resolve, reject) => {
          instance
            .delete(deleteUser)
            .then((response) => {
              console.log("============"+response);
              if (response) {
                localStorage.clear("token");
                commit("userInfo", response.data.user);
              }
              resolve(response);
              window.location.reload();
            })
            .catch((error) => {
              console.log("=============: "+error);
              reject(error);
            });
        });
      } else {
        console.log("====== nooooooo ===========")
        localStorage.getItem("token");
      }
    },

  },
 //################### modules ##############
  modules: {
  }
})