<template>
  <div class="root">
    <TheNav class="flex center">
      <button @click="toggleSignInModal">Sign In</button>
      <button @click="route">Route</button>
    </TheNav>
    <TheMain :showSignInModal="showSignInModal" @toggle-show-modal="toggleSignInModal"></TheMain>
</div>
</template>

<script>
import TheNav from '@/components/TopNav.vue'
import TheMain from '@/components/TheMain.vue'
import Axios from 'axios'

export default {
  name: 'app',
  components: {
    TheNav,
    TheMain
  },
  data () {
    return {
      showSignInModal: false
    }
  },
  methods: {
    toggleSignInModal() {
      this.showSignInModal = !(this.showSignInModal);
    },
    async route() {
      try {
        const response = await Axios.get('http://localhost:5000/items');
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
