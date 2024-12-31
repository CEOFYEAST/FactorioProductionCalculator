import { createApp } from "vue"
import router from './router'
import App from "../components/App.vue"
import '../assets/Global.css'

createApp(App)
    .use(router)
    .mount("#app");


/**
 * - Router is imported from router.js file, where it is defined
 * - Router is then added to the app
 */