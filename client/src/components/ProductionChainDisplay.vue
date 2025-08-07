<template>
  <div class="ProductionChainDisplay-container">
    <h3 class="container__section-title">Production Chain</h3>
    <div class="container__content">
      <div v-for="(value, key) in prodChain" :key="key" class="container__item">
        <div>{{ key }}: {{ value }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductionChainDisplay',
  props: {
    prodChain: {
      type: Object,
      required: true,
      default: () => ({})
    }
  }
}
</script>

<style scoped>
.ProductionChainDisplay-container {
  width: 100%;
}

.container__section-title {
  margin-top: 0;
  margin-bottom: 10px;
  font-family: var(--main-font-family);
}

.container__content {
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid gray;
  padding: 10px;
  border-radius: 4px;
  background-color: var(--primary-color);
}

.container__item {
  border: 1px solid black;
  margin-bottom: 10px;
  padding: 10px;
  font-family: var(--main-font-family);
  font-size: var(--body-font-size);
  color: var(--main-text-color);
  background-color: white;
  border-radius: 3px;
}
</style>