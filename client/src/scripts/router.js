import { createRouter, createWebHistory } from 'vue-router'

import AccountAccessView from '@/views/AccountAccessView.vue'
import AccountCreationView from '@/views/AccountCreationView.vue'
import AboutView from '@/views/AboutView.vue'
import WidgetsView from '@/views/WidgetsView.vue'

const routes = [
  { path: '/widgets', component: WidgetsView },
  { path: '/users/access', component: AccountAccessView },
  { path: '/users/create', component: AccountCreationView },
  { path: '/', component: AboutView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router