<template>
  <div class="root">
    <TheNav class="flex center">
      <button @click="toggleSignInModal">Sign In</button>
      <button @click="toggleAccountCreationModal">Create Account</button>
      <button @click="route">Route</button>
    </TheNav>
    <TheMain :showSignInModal="showSignInModal" :showAccountCreationModal="showAccountCreationModal" @toggle-show-sign-in="toggleSignInModal" @toggle-show-account-creation="toggleAccountCreationModal"></TheMain>
</div>
</template>

<script>
import TheNav from '@/components/TopNav.vue'
import TheMain from '@/components/TheMain.vue'
import Axios from 'axios'
var hostName = require('./globals.module.js')

export default {
  name: 'app',
  components: {
    TheNav,
    TheMain
  },
  data () {
    return {
      showSignInModal: false,
      showAccountCreationModal: false
    }
  },
  methods: {
    toggleSignInModal() {
      this.showSignInModal = !(this.showSignInModal);
    },
    toggleAccountCreationModal() {
      this.showAccountCreationModal = !(this.showAccountCreationModal);
    },
    async route() {
      try {
        const response = await Axios.get(`http://${hostName}/items`);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
}
</style>
