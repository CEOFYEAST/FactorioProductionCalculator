import { createRouter, createWebHistory } from 'vue-router'

import AccountAccessView from '@/views/AccountAccessView.vue'
import AccountCreationView from '@/views/AccountCreationView.vue'
import AboutView from '@/views/AboutView.vue'
import SaveSlotsView from '@/views/SaveSlotsView.vue'
import ProductionCalculatorView from '@/views/ProductionCalculatorView.vue'

export const definedRoutes = await {
  accountAccessRoute: '/accounts/access',
  accountCreationRoute: '/accounts/create',
  saveSlotsFetchRoute: '/save-slots/access',
  saveSlotsUpdateRoute: '/save-slots/update',
  aboutViewRoute: '/',
  saveSlotsRoute: '/save-slots',
  prodChainCalculatorRoute: '/prod-chain-calculator'
}

const routes = [
  { path: definedRoutes.saveSlotsRoute, component: SaveSlotsView },
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

