<template>
  <div id="TheNav-root" class="root">

        <div></div>

        <div class="flex row center">
          <RouterLink class="link" :to="definedRoutes.widgetsRoute">Widgets</RouterLink>
          <RouterLink class="link" :to="definedRoutes.accountAccessRoute">Sign In</RouterLink>
          <RouterLink class="link" :to="definedRoutes.accountCreationRoute">Create Account</RouterLink>
          <RouterLink class="link" :to="definedRoutes.aboutViewRoute">About</RouterLink>
          <a :href="definedRoutes.documentationRoute">Documentation</a>
          <button @click="store.toggleSignedIn()" id="test-sign-in-toggle">Toggle</button>
        </div>

        <div class="flex row center" v>
          <button @click="store.toggleSignedIn()" v-if="signedIn" id="user-widget">ceofyeast</button>
        </div>

  </div>
</template>

<script setup>
import { definedRoutes } from '@/scripts/router';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia'

const store = useUserStore()
let { signedIn } = storeToRefs(store)

</script>

<style scoped>
#TheNav-root {
  display: inline-grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  /* flex-direction: row; */
  /* max-height: 50px; */
  background-color: greenyellow;
  border-bottom: 1px solid black;
}
.link, a, #user-widget, #test-sign-in-toggle {
    all: unset;
    min-width: max-content;
    margin: 5px;
    padding: 5px;
    background: white;
    color: black;
    border: 2px solid black;
  }
</style>