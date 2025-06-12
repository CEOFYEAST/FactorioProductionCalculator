<template>
  <div id="TheNav-root" class="root">

        <div></div>

        <div class="flex row center">
          <RouterLink class="link" :to="definedRoutes.saveSlotsRoute">Save Slots</RouterLink>
          <RouterLink class="link" :to="definedRoutes.prodChainCalculatorRoute">Prod Chain Calculator</RouterLink>
          <RouterLink class="link" :to="definedRoutes.accountAccessRoute">Sign In</RouterLink>
          <RouterLink class="link" :to="definedRoutes.accountCreationRoute">Create Account</RouterLink>
          <RouterLink class="link" :to="definedRoutes.aboutViewRoute">About</RouterLink>
          <a :href="link + '/documentation'">Documentation</a>
        </div>

        <div id="right-column" class="flex row middle center">
          <div v-if="signedIn" id="user-widget" class="flex row middle center">
            <div id="username-display">{{ username }}</div>
            <button @click="logout()" id="dropdown-logout-button">Log Out</button>
          </div>
        </div>

  </div>
</template>

<script setup>
import { definedRoutes } from '@/scripts/router';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { link } from '@/scripts/globals.module';

const userStore = useUserStore()
let { signedIn, username } = storeToRefs(userStore)
const { logout } = userStore
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
.link, a, #test-sign-in-toggle {
    all: unset;
    min-width: max-content;

    margin: 5px;
    padding: 5px;
    background: white;
    color: black;
    border: 2px solid black;
}
 .link:hover, a:hover, #test-sign-in-toggle:hover {
  background-color:lightgray;
  cursor: pointer;
}
#right-column {
  margin-left: 20px;
}
#user-widget {
  color: black;
  background-color:white;
  border: 2px solid black;
}
#dropdown-logout-button {
  min-width: max-content;
  margin-right: 5px;
}
#username-display {
  margin: 5px;
}
</style>