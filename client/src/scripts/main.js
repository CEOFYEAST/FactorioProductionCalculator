import { createApp } from "vue"
import { createPinia } from "pinia"
//import App from '../components/App.vue'
import router from '@/scripts/router'
import config from '@ceofyeast/prodchaincalculators/config'
import axios from '@/scripts/axios.js'
import '@/assets/Global.css'

const pinia = createPinia()
config.axiosInstance = axios
//config.initialLoad = true

// createApp(App)
//     .use(router)
//     .use(pinia)
//     .mount("#app");

import("@/components/App.vue").then((AppModule) => {
    createApp(AppModule.default)
        .use(router)
        .use(pinia)
        .mount("#app");
})



/**
 * - Router is imported from router.js file, where it is defined
 * - Router is then added to the app
 */