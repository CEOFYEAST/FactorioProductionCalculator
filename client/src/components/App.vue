<template>
  <div class="App-container container--full">
    <TheBody/>
  </div>
</template>

<script>
import TheBody from './TheBody.vue'

export default {
  name: 'app',
  components: {
    TheBody
  }
}
</script>

<style>
.container--full {
  max-width: 100%;
  width: 100%;
  min-width: 100%;
  height: auto;
  max-height: none;
  min-height: 100vh;
  overflow-x: hidden;
}

/* Global overflow control */
html, body {
  overflow-x: hidden;
  max-width: 100vw;
}
</style>


