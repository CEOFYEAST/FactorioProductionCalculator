<template>
    <div class="root">
      <TheNav class="flex center">
        <button @click="this.displayModal(this.accountPostModalName)">Create Account</button>
        <button @click="this.displayModal(this.accountGetModalName)">Sign In</button>
        <button @click="route">Route</button>
      </TheNav>
      <TheMain :showAccountGetModal="showAccountGetModal" :showAccountPostModal="showAccountPostModal"/>
    </div>
  </template>
  
  <script>
  import TheNav from '@/components/TopNav.vue'
  import TheMain from '@/components/TheMain.vue'
  import Axios from 'axios'
  var hostName = require('./globals.module.js')
  
  export default {
    name: 'body',
    components: {
      TheNav,
      TheMain
    },
    data() {
      return {
        showAccountGetModal: false,
        showAccountPostModal: false,
        accountGetModalName: "account-get-modal",
        accountPostModalName: "account-post-modal"
      }
    },
    methods: {
      displayModal(toDisplay)
      {
        this.showAccountGetModal = false;
        this.showAccountPostModal = false;
  
        if(toDisplay == this.accountGetModalName) this.showAccountGetModal = true;
        else if(toDisplay == this.accountPostModalName) this.showAccountPostModal = true;
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
  
  
  