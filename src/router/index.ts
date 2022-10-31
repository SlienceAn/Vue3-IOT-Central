import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '../Login.vue';
import MainPanel from '../components/IotIndex/MainPanel.vue';
import IotIndex from '../IotIndex.vue';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/IotIndex',
    name: 'IotIndex',
    component: IotIndex,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: MainPanel,
      },
      {
        path: '/MainPanel',
        name: 'Dashboard',
        component: MainPanel,
      }
    ]
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
