import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '../Login.vue';
import MainPanel from '../MainPanel.vue';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/MainPanel',
    name: 'MainPanel',
    component: MainPanel
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
