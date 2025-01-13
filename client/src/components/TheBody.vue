<template>
    <div id="TheBody-root" class="root">
      <TheNav class="nav">
        
        <div class="flex row center">
          <RouterLink class="link" to="/">Home Page</RouterLink>
          <RouterLink class="link" to="/users/access">Sign In</RouterLink>
          <RouterLink class="link" to="/users/create">Create Account</RouterLink>
          <a href="/documentation">Documentation</a>
        </div>

      </TheNav>
      <TheMain class="main"/>
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
    }
  }
  </script>
  
  <style>
  .link, a {
    all: unset;
    margin: 5px;
    background: white;
    color: black;
  }
  .main {
    /* max-width: 60%;
    min-width: 50%; */
    width: 60%;
    height: 100%;
    background-color: white;
  }
  .nav {
    width: 100%
  }
  #TheBody-root {
    background-color: gray;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  </style>
  
  
  