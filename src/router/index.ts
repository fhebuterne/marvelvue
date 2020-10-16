import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Home from '../pages/Home/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/search',
    name: 'Search',
    component: import('../pages/Search.vue')
  },
  {
    path: '/character/:id',
    name: 'Character',
    component: import('../pages/Character.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
