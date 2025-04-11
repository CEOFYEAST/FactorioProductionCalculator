<template>
  <div class="production-node" :class="{ 'base-item': isBaseItem, 'user-demand': hasUserDemand }">
    <div class="node-header">
      <h3>{{ itemName }}</h3>
    </div>
    <div class="node-content">
      <div v-if="hasUserDemand" class="demand-info">
        <div class="label">User Demand:</div>
        <div class="value">{{ formatNumber(itemData.userIRPTU) }} / {{ timeUnit }}</div>
      </div>
      <div v-if="itemData.intermIRPTU > 0" class="demand-info">
        <div class="label">Intermediary Demand:</div>
        <div class="value">{{ formatNumber(itemData.intermIRPTU) }} / {{ timeUnit }}</div>
      </div>
      <div v-if="Object.keys(itemData.dependentItems).length > 0" class="dependent-items">
        <div class="label">Required By:</div>
        <ul>
          <li v-for="(amount, item) in itemData.dependentItems" :key="item">
            <div class="dependent-item">
              <div class="item-name">{{ formatItemName(item) }}</div>
              <div class="item-amount">{{ formatNumber(amount) }} / {{ timeUnit }}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'ProductionNode',
  props: {
    itemId: {
      type: String,
      required: true
    },
    itemData: {
      type: Object,
      required: true
    },
    timeUnit: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const hasUserDemand = computed(() => props.itemData.userIRPTU > 0)
    const isBaseItem = computed(() => Object.keys(props.itemData.dependentItems).length === 0)
    const itemName = computed(() => formatItemName(props.itemId))

    function formatItemName(id) {
      return id
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    }

    function formatNumber(num) {
      return Number(num).toFixed(2)
    }

    return {
      hasUserDemand,
      isBaseItem,
      itemName,
      formatItemName,
      formatNumber
    }
  }
}
</script>

<style scoped>
.production-node {
  border: 2px solid #666;
  border-radius: 8px;
  padding: 16px;
  margin: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: fit-content;
  min-width: 200px;
  max-width: 300px;
}

.base-item {
  border-color: #4CAF50;
}

.user-demand {
  border-color: #2196F3;
}

.node-header {
  border-bottom: 1px solid #eee;
  margin-bottom: 12px;
  padding-bottom: 8px;
}

.node-header h3 {
  margin: 0;
  font-size: 1.1em;
  color: #333;
}

.demand-info {
  margin: 12px 0;
}

.label {
  font-weight: bold;
  color: #666;
  margin-bottom: 4px;
}

.value {
  color: #333;
  background-color: #f8f8f8;
  padding: 6px 10px;
  border-radius: 4px;
  text-align: center;
  font-family: monospace;
}

.dependent-items {
  margin-top: 16px;
}

.dependent-items ul {
  list-style: none;
  padding-left: 0;
  margin: 8px 0 0 0;
}

.dependent-items li {
  margin-bottom: 8px;
}

.dependent-item {
  background-color: #f8f8f8;
  padding: 8px;
  border-radius: 4px;
}

.item-name {
  color: #666;
  font-size: 0.9em;
  margin-bottom: 4px;
}

.item-amount {
  color: #333;
  text-align: center;
  font-family: monospace;
}
</style> 