<template>
  <div class="TheBody-container container--full">
    <TheTopNav/>
    <TheMain/>
  </div>
</template>
  
  <script setup>
  import TheTopNav from '@/components/TheTopNav.vue'
  import TheMain from '@/components/TheMain.vue'
  </script>
  
  <style scoped>
  .TheBody-container {
    background-color: gray;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: auto;
    max-height: none;
    min-height: 100vh;
    overflow-x: hidden;
  }
  </style>
  
  
  