<template>
  <div id="App-root" class="root">
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

<style scoped>
#App-root {
  width: 100%;
  height: 100%;
}
</style>


