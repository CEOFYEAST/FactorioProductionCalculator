<template>
    <div id="TheBody-root" class="root">
      <TheNav>
        
        <div class="flex row center">
          <RouterLink class="link" to="/widgets">Widgets</RouterLink>
          <RouterLink class="link" to="/users/access">Sign In</RouterLink>
          <RouterLink class="link" to="/users/create">Create Account</RouterLink>
          <RouterLink class="link" to="/">About</RouterLink>
          <a href="/documentation">Documentation</a>
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
    }
  }
  </script>
  
  <style scoped>
  .link, a {
    all: unset;
    margin: 5px;
    padding: 5px;
    background: white;
    color: black;
    border: 2px solid black;
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
  
  
  