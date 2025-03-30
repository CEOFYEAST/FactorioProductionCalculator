import { createRouter, createWebHistory } from 'vue-router'

import AccountAccessView from '@/views/AccountAccessView.vue'
import AccountCreationView from '@/views/AccountCreationView.vue'
import AboutView from '@/views/AboutView.vue'
import UserDataView from '@/views/UserDataView.vue'
import ProductionCalculatorView from '@/views/ProductionCalculatorView.vue'

export const definedRoutes = await {
  accountAccessRoute: '/users/access',
  accountCreationRoute: '/users/create',
  aboutViewRoute: '/',
  userDataRoute: '/user-data',
  prodChainCalculatorRoute: '/prod-chain-calculator'
}

const routes = [
  { path: definedRoutes.userDataRoute, component: UserDataView },
  { path: definedRoutes.accountAccessRoute, component: AccountAccessView },
  { path: definedRoutes.accountCreationRoute, component: AccountCreationView },
  { path: definedRoutes.aboutViewRoute, component: AboutView },
  { path: definedRoutes.prodChainCalculatorRoute, component: ProductionCalculatorView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

