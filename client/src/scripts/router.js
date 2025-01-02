import { createRouter, createWebHistory } from 'vue-router'

import AccountAccessView from '@/views/AccountAccessView.vue'
import AccountCreationView from '@/views/AccountCreationView.vue'

const routes = [
  { path: '/users/access', component: AccountAccessView },
  { path: '/users/create', component: AccountCreationView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router