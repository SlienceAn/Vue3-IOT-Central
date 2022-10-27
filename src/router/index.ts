import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '../Login.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from) => {
  // console.log("to", to)
  // console.log("from ", from)
})
export default router
