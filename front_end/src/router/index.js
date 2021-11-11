import { createRouter, createWebHashHistory } from 'vue-router'
import login from '../views/login.vue'
import Home from '../views/Home.vue'
import MyProfil from '../views/MyProfil.vue'
import tousUtulisateur from '../views/tousUtulisateur.vue'

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
    path: '/tousUtulisateur',
    name: 'tousUtulisateur',
    component: tousUtulisateur

  },
 
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
