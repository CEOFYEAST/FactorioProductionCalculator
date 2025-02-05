import { createRouter, createWebHistory } from 'vue-router'

import AccountAccessView from '@/views/AccountAccessView.vue'
import AccountCreationView from '@/views/AccountCreationView.vue'
import AboutView from '@/views/AboutView.vue'
import WidgetsView from '@/views/WidgetsView.vue'

export const definedRoutes = await {
  accountAccessRoute: '/users/access',
  accountCreationRoute: '/users/create',
  aboutViewRoute: '/',
  widgetsRoute: '/widgets'
}

const routes = [
  { path: definedRoutes.widgetsRoute, component: WidgetsView },
  { path: definedRoutes.accountAccessRoute, component: AccountAccessView },
  { path: definedRoutes.accountCreationRoute, component: AccountCreationView },
  { path: definedRoutes.aboutViewRoute, component: AboutView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

