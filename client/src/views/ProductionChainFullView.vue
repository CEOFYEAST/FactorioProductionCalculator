<template>
  <div class="production-chain-full-view">
    <ProductionChainView
      :prodChain="prodChain"
      :timeUnit="timeUnit"
    />
  </div>
</template>

<script>
import ProductionChainView from '../components/ProductionChainView.vue'

export default {
  name: 'ProductionChainFullView',
  components: {
    ProductionChainView
  },
  props: {
    prodChain: {
      type: Object,
      required: true
    },
    timeUnit: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.production-chain-full-view {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  z-index: 100;
}
</style> 