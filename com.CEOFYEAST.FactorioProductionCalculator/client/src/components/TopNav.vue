<template>
  <div class="root">

      <nav>
        <slot></slot>
      </nav>

  </div>
</template>

<script>
import { provide } from 'vue';

export default {
    name: 'top nav',
}
</script>

<style scoped>
nav {
  width: 100%;
  background-color: greenyellow;
  border-bottom: 1px solid black;
}
</style>