<template>
    <div class="root">
      <TheNav>
        
        <div class="flex row center">
          <RouterLink class="link" to="/">Home Page</RouterLink>
          <RouterLink class="link" to="/users/access">Sign In</RouterLink>
          <RouterLink class="link" to="/users/create">Create Account</RouterLink>
        </div>

      </TheNav>
      <TheMain/>
    </div>
  </template>
  
  <script>
  import TheNav from '@/components/TopNav.vue'
  import TheMain from '@/components/TheMain.vue'
  
  export default {
    name: 'body',
    components: {
      TheNav,
      TheMain
    },
    data() {
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
  .link {
    margin: 5px;
    background: white;
    color: black;
  }
  </style>
  
  
  