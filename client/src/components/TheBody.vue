<template>
    <div id="TheBody-root" class="root">
      <TheNav/>
      <TheMain/>
    </div>
  </template>
  
  <script setup>
  import TheNav from '@/components/TheNav.vue'
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
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  </style>
  
  
  