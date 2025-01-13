<template>
  <div id="TopNav-root" class="root">

      <nav>
        <slot></slot>
      </nav>

  </div>
</template>

<script>
export default {
    name: 'top nav',
}
</script>

<style scoped>
#TopNav-root {
  width: 100%;
  background-color: greenyellow;
  border-bottom: 1px solid black;
}
</style>