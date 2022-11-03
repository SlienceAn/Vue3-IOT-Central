import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '../Login.vue';
import MainPanel from '../components/IotIndex/MainPanel.vue';
import IotIndex from '../IotIndex.vue';
import UpdateParams from '../components/IotIndex/UpdateParams.vue';
import History from '../components/IotIndex/History.vue';
import ReportExcel from '../components/IotIndex/ReportExcel.vue';
import IotHealth from '../components/IotIndex/IotHealth.vue';

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
      },
      {
        path: '/History',
        name: '歷史事件查詢',
        component: History
      },
      {
        path: '/ReportExcel',
        name: '查詢巡檢報表',
        component: ReportExcel
      },
      {
        path: '/IotHealth',
        name: '健康度分析',
        component: IotHealth
      }
    ]
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
