import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '../Login.vue';
import MainPanel from '../components/IotIndex/MainPanel.vue';
import IotIndex from '../IotIndex.vue';
import UpdateParams from '../components/IotIndex/UpdateParams.vue'
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
    props: true,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: MainPanel,
        props: true
      },
      {
        path: '/MainPanel',
        name: 'Dashboard',
        component: MainPanel,
        props: true
      },
      {
        path: '/UpdateParams',
        name: '更新參數設定',
        component: UpdateParams
      }
    ]
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
