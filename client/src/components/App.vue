<template>
  <div id="appRoot">
    <TheBody class="body"/>
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
.body {
  background-color: gray;
  width: 100%;
  height: 100%;
}
#appRoot {
  width: 100%;
  height: 100%;
}
</style>


