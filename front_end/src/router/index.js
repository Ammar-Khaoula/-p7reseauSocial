import { createRouter, createWebHashHistory } from 'vue-router'
import login from '../views/login.vue'
import Home from '../views/Home.vue'
import MyProfil from '../views/MyProfil.vue'
import updateProfil from '../views/updateProfil.vue'
import allUser from '../views/allUser.vue'
import post from '../views/post.vue'
const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  {
    path: '/MyProfil',
    name: 'MyProfil',
    component: MyProfil
  },
  {
    path: '/updateProfil',
    name: 'updateProfil',
    component: updateProfil
  },
  {
    path: '/allUser',
    name: 'allUser',
    component: allUser
  },
  {
    path: '/post',
    name: 'post',
    component: post
  },
 
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
