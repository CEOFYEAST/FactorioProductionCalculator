<template>
  <div id="App-root" class="full">
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
.full {
  max-width: 100%;
  width: 100%;
  min-width: 100%;
  max-height: 100%;
  height: 100%;
  min-height: 100%;
}
</style>


