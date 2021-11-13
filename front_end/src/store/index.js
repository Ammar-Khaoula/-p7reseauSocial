import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
let ls = new SecureLS({ isCompression: false });

const axios = require('axios');
const instance = axios.create({
  baseURL: 'http://localhost:5000/api/'
});
let user = localStorage.getItem('user');
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
    post: {},
    commentaire: null,
    createdAt: Date,
    token: '',
    userInfo: {
      first_name: '',
      last_name: '',
      email: '',
      bio: '',
    },
    SET_POSTS: {
      publication: '',
      imageUrl: '',
      createdAt: Date,
      like: 0,
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
    },
    userInfo: function (state, userInfo) {
      state.userInfo = userInfo;
    },
    users: function (state, users) {
      state.users = users;
    },

  SET_POSTS(state, posts) {
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
        console.log(postFind);
        console.log(post.post.id, "==", postFind.id);
        if (postFind.id == post.post.id) {
          state.posts.splice(index, 1);
          // console.log(postFind.splice(post));
        }
        index++;
      }
  },
	LIKE_POST(state, posts) {
		state.posts = posts;
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
      console.log('post.publication');
      let formData = new FormData();
      formData.append("image", post.image);
      formData.append("like", post.like);
      formData.append("publication", post.publication);
      console.log("formData", formData);
      const createPost = "/postes/";
      return new Promise((resolve, reject) => {
        instance.post(createPost, formData)
          .then((response) => {
            console.log("createPost");
            commit("ADD_NEW_POST", response.data.post);
            console.log('crcrcrcrcrcrcr'+response.data.post);
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
            commit("SET_POSTS", response.data.posts);
            commit('ADD_USERSLIKED_TO_POST');
            console.log('+++++++++++++: ' +response);
          })
          .catch((error) => {
            console.log('ereur ereur ereur: '+error);
      });
    },
    deletePost({ commit }, post) {
      const confirmDelete = confirm(
        "Êtes vous sûr de vouloir supprimer ce post ?"
      );
      const deletePost = `/postes/${post.dynamicId}`;
      console.log("before promiseBBBBB: ", post.dynamicId);
      if (confirmDelete) {
        return new Promise((resolve, reject) => {
          instance
            .delete(deletePost)
            .then((response) => {
              console.log("delete reponseDDDDDDD: ", response.data);
              commit("deletePost", response.data.post);
              console.log("delete reponse");
              resolve(response);
            })
            .catch((error) => {
              // post
              console.log("dddddd"+error);
              reject(error);
            });
        });
      }
    },
    /*updatePost({ commit }, post) {
      console.log('post.publication');
      let formData = new FormData();
      formData.append("image", post.image);
      formData.append("publication", post.publication);
      const createUpdatePost = `/postes/${post.dynamicId}`;
        instance
          .put(createUpdatePost, formData)
          .then((response) => {
            console.log(response.data.post);
            commit("update_post", response.data.post);
          })
          .catch((error) => {
            console.log(error);
          });
    },*/

  },
 //################### modules ##############
  modules: {
  }
})
