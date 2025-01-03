import { createRouter, createWebHistory } from 'vue-router'

import AccountAccessView from '@/views/AccountAccessView.vue'
import AccountCreationView from '@/views/AccountCreationView.vue'
import HomeView from '@/views/HomeView.vue'

const routes = [
  { path: '/users/access', component: AccountAccessView },
  { path: '/users/create', component: AccountCreationView },
  { path: '/', component: HomeView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router