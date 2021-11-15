import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
let ls = new SecureLS({ isCompression: false });

const axios = require('axios');
const instance = axios.create({
  baseURL: 'http://localhost:5000/api/'
});
let user = localStorage.getItem('user');
const userId = JSON.parse(user).userId;
if (!user) {
  user = {
    userId: -1,
    token: '',
  };
} else {
    try{
      user = JSON.parse(user);
     instance.defaults.headers.common['Authorization'] = user.token;
    } catch(ex) {
      user = {
        userId: -1,
        token: '',
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
    createdAt: Date,
    token: '',
    userInfo: {
      id : '',
      first_name: '',
      last_name: '',
      email: '',
      bio: '',
    },
    post: {
      publication: '',
      imageUrl: '',
      createdAt: Date,
      like: 0,
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
      state.user = user;
      console.log("**********" + user.userId);
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
	ADD_USERSLIKED_TO_POST(state){
		const usersLiked = [];
		const posts = state.posts;
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
      // Boucle sur le tableau de la post
      for (let i = 0; i < state.posts.length; i++) {
        if (state.posts[i].UserId == post.id) {
          console.log(state.posts[i].publication, "==", post.publication);
          state.posts[i].publication = post.publication;
          state.posts[i].imageUrl = post.imageUrl;
          state.posts[i].updatedAt = post.updatedAt;
        }
      }
  },

  deletePost(state, post) {
    let index = 0;
      for (let postFind of state.posts) {
        if (postFind.id == post.id) {
          state.posts.splice(index, 1);
          // console.log(postFind.splice(post));
        }
        index++;
      }
  },
	LIKE_POST(state, posts) {
		state.posts = posts;
  },
  addComment(state, commentaire) {
      for (let postFind of state.posts) {
        if (postFind.id == commentaire.postId) {
          postFind.commentaire.push(commentaire);
        }
      }
    },
	LIKE_COMMENT(state, posts) {
		state.posts = posts;
	},
	SET_ALL_USERS(state, allUsers) {
		state.allUsers = allUsers;
    },
	ADD_FALSE_IMAGE_TO_AUTHORS(state) {
		const posts = state.posts;
		posts.forEach(post => {
			if (post.user.imageURL == null) {
				const index = state.posts.indexOf(post);
				post.user.imageURL ="@/assets/user-regular.svg";
				if (post.commentaires.user.imageURL == null) {
					post.commentaires.user.imageURL ="@/assets/dev_images/user-regular.svg";
				}
				state.posts.splice(index, 1, post); 
			}
		});
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
    });
      
    },
    getProfil: ({ commit }) => {
        commit;
        instance.get('/profile/')
          .then(function (response) {
            commit('userInfo', response.data.users);
            console.log('====' + response.data.users);
          })
          .catch(function () {
            console.log('----------------');
      })
    },
    // Creation du post
    createPost({ commit }, post) {
      let formData = new FormData();
      formData.append("publication", post.publication);
      formData.append("image", post.image);
      formData.append("like", post.like);
      formData.append("userId", userId);
      console.log("----" + userId);
      console.log("formData", formData.publication);
      const createPost = "/postes/";
      return new Promise((resolve, reject) => {
        instance.post(createPost, formData)
          .then((response) => {
            console.log("createPost");
            commit("ADD_NEW_POST", response.data.post);
           console.log('crcrcrcrcrcrcr'+response.data.post.user);
            resolve(response);
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },
     // importer tous les posts
      getAllPost({ commit }) {
        instance.get('/postes/')
          .then((response) => {
            console.log("GetAllPost: "+response.data.posts);
            commit("post", response.data.posts);
            commit('ADD_USERSLIKED_TO_POST');
          })
          .catch((error) => {
            console.log('ereur ereur ereur: '+error);
      });
    },
    deletePost({ commit }, post) {

      let formData = new FormData();
      formData.append("userId", userId);

      const confirmDelete = confirm(
        "Êtes vous sûr de vouloir supprimer ce post ?"
      );
      console.log("b===== ", post.dynamicId);
      const deletePost = `/postes/${post.dynamicId}`;
      if (confirmDelete) {
        console.log("+++okkkk+++"+deletePost)
        return new Promise((resolve, reject) => {
          instance
            .delete(deletePost, formData)
            .then((response) => {
              console.log("delete reponseDDDDDDD: ", response.data);
              commit("deletePost", response.data.post);
              console.log("delete reponse");
              resolve(response);
              window.location.reload();
            })
            .catch((error) => {
              // post
              console.log("Error : "+error);
              reject(error);
            });
        });
      }
    },
    updatePost({ commit }, post) {
      console.log('post.publication');
      let formData = new FormData();
      const postId = document.getElementById("idPost").innerText;
      console.log(postId+"===" + post.dynamicId +" : "+post.like+" : "+userId+" : "+post.id);
      formData.append("publication", post.publication);
      formData.append("imageUrl", post.image);
      formData.append("like", post.like);
      formData.append("userId", userId);
      const createUpdatePost = `/postes/${postId}`;
        instance
          .put(createUpdatePost, formData)
          .then((response) => {
            console.log("*****"+response.data.post.userId);
            commit("update_post", response.data.post);
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
    },
    createComment({ commit }, comment) {
      console.log("this.comment");
      let formData = new FormData();
      formData.append("image", comment.image);
      formData.append("comment", comment.commentaire);
      console.log("formData", formData);
      const createComment = `/comment/${comment.postId}`;
      return new Promise((resolve, reject) => {
        instance
          .post(createComment, formData)
          .then((response) => {
            console.log("Hey::", response.data.comment);
            commit("addComment", response.data.comment);
            resolve(response);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },

  },
 //################### modules ##############
  modules: {
  }
})
