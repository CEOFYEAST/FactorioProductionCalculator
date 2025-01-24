import { createApp } from "vue"
import { createPinia } from "pinia"
import router from '@/scripts/router'
import App from "@/components/App.vue"
import '@/assets/Global.css'

const pinia = createPinia()

createApp(App)
    .use(router)
    .use(pinia)
    .mount("#app");


/**
 * - Router is imported from router.js file, where it is defined
 * - Router is then added to the app
 */