import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
import Datepicker from '@vuepic/vue-datepicker'
import Loading from './components/parts/Loading.vue'
import '@vuepic/vue-datepicker/dist/main.css'
import { store } from './store'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
const app = createApp(App);
app.directive('focus', {
    mounted(el) {
        el.focus()
    }
})
app.component("Loading", Loading)
app.component("Datepicker", Datepicker)
app.config.globalProperties.$cookies = VueCookies;
app.use(store)
app.use(router)
app.mount('#app')
