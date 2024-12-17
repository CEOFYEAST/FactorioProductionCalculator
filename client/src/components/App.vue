<template>
  <div class="root">
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
}
</style>


