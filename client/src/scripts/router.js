import { createRouter, createWebHistory } from 'vue-router'

// import HomeView from '../HomeView.vue'
// import AboutView from '.components'

const routes = [
  // { path: '/', component: HomeView },
  // { path: '/about', component: AboutView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router