import { createApp } from "vue"
import { createPinia } from "pinia"
import router from '@/scripts/router'
import config from '@ceofyeast/prodchaincalculators/config'
import axios from '@/scripts/axios.js'
import App from "@/components/App.vue"
import '@/assets/Global.css'

const pinia = createPinia()
config.axiosInstance = axios

createApp(App)
    .use(router)
    .use(pinia)
    .mount("#app");


/**
 * - Router is imported from router.js file, where it is defined
 * - Router is then added to the app
 */