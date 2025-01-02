<template>
    <div class="root">
      <TheNav class="flex center">
        <!-- <button @click="showModal(modalEnums.ACCOUNT_POST_MODAL)">Create Account</button>
        <button @click="showModal(modalEnums.ACCOUNT_GET_MODAL)">Sign In</button>
        <button @click="route">Route</button> -->
        <RouterLink to="/users/access">Sign In</RouterLink>
        <RouterLink to="/users/create">Create Account</RouterLink>
      </TheNav>
      <TheMain/>
    </div>
  </template>
  
  <script>
  import TheNav from '@/components/TopNav.vue'
  import TheMain from '@/components/TheMain.vue'
  import Axios from 'axios'
  var hostName = require('../scripts/globals.module.js')
  
  export default {
    name: 'body',
    components: {
      TheNav,
      TheMain
    },
    data() {
    },
    methods: {
      // async route() {
      //   try {
      //     const response = await Axios.get(`http://${hostName}/items`);
      //     console.log(response.data);
      //   } catch (error) {
      //     console.error(error);
      //   }
      // }
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
  
  
  