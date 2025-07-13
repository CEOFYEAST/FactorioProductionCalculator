<template>
    <div id="TheBody-root" class="full">
      <TheTopNav/>
      <TheMain/>
    </div>
  </template>
  
  <script setup>
  import TheTopNav from '@/components/TheTopNav.vue'
  import TheMain from '@/components/TheMain.vue'
  </script>
  
  <style scoped>
  .link, a, #user-widget {
    all: unset;
    margin: 5px;
    padding: 5px;
    background: white;
    color: black;
    border: 2px solid black;
  }
  #TheBody-root {
    background-color: gray;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  </style>
  
  
  