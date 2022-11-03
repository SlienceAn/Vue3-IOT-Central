import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
const app = createApp(App);
app.directive('focus', {
    mounted(el) {
        el.focus()
    }
})
//Test Vuex
const Store = createStore({
    state: {
        data: null,
        projectCode: []
    },
    mutations: {
        setData(state, payload) {
            state.data = payload;
        },
        setProjectCode(state, payload) {
            state.projectCode = payload
        }
    }
})
app.config.globalProperties.$cookies = VueCookies;
app.use(Store)
app.use(router)
app.mount('#app')
