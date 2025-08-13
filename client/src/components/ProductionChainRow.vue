<template>
  <div class="production-chain-row">
    <div class="main-row-content">
      <div class="row__expander-container">
        <button @click="toggleExpanded" class="expand-button">
          {{ isExpanded ? '−' : '+' }}
        </button>
      </div>
      <div class="row__icon-container">
        <img class="row__icon" :src="iconPath" />
      </div>
      <div class="row__arrow-container">
        <span class="row__arrow">←</span>
      </div>
      <div class="row__demand">
        {{ demand }}
      </div>
      <div class="row__filler"/>
      <div class="row__crafter-icon-container">
        <img class="row__crafter-icon" :src="crafterIconPath" />
      </div>
      <div class="row__crafter-multiplier-container">
        <span class="row__crafter-multiplier">×</span>
      </div>
      <div class="row__crafter-count-container">
        <span class="row__crafter-count">{{ formattedCrafterCount }}</span>
      </div>
      <div class="row__filler"/>
    </div>
    
    <ProductionChainSubRows
      v-if="isExpanded && showSubRows"
      :dependent-items="dependentItems"
      :ingredient-items="ingredientItems"
      :prod-chain="prodChain"
      :current-item-icon-path="iconPath"
    />
  </div>
</template>

<script>
import ProductionChainSubRows from './ProductionChainSubRows.vue'

export default {
  name: 'ProductionChainRow',
  components: {
    ProductionChainSubRows
  },
  props: {
    iconPath: {
      type: String,
      default: ''
    },
    demand: {
      type: [String, Number],
      default: 0
    },
    dependentItems: {
      type: Object,
      default: () => ({})
    },
    ingredientItems: {
      type: Object,
      default: () => ({})
    },
    prodChain: {
      type: Object,
      default: () => ({})
    },
    crafter: {
      type: String,
      default: ''
    },
    crafterCount: {
      type: [String, Number],
      default: 0
    },
    crafterIconPath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isExpanded: false
    }
  },
  computed: {
    gridColumns() {
      return '50px 64px 64px 64px 64px 64px 64px 64px 1fr';
    },
    showSubRows() {
      return this.hasDependent || this.hasIngredients;
    },
    hasDependent() {
      return Object.keys(this.dependentItems).length > 0;
    },
    hasIngredients() {
      return Object.keys(this.ingredientItems).length > 0;
    },
    formattedCrafterCount() {
      // Handle string values like "N/A"
      if (typeof this.crafterCount === 'string') {
        return this.crafterCount;
      }
      
      // Handle numeric values
      if (typeof this.crafterCount === 'number' && !isNaN(this.crafterCount)) {
        return parseFloat(this.crafterCount.toFixed(2));
      }
      
      // Fallback for other cases
      return '0';
    }
  },
  methods: {
    toggleExpanded() {
      this.isExpanded = !this.isExpanded;
    }
  }
}
</script>

<style scoped>
.production-chain-row {
  display: flex;
  flex-direction: column;
  border-bottom: var(--medium-border);
}

.main-row-content {
  display: grid;
  grid-template-columns: v-bind(gridColumns);
  height: 40px;
  align-items: center;
}

.row__expander-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.expand-button {
  width: 20px;
  height: 20px;
  background: transparent;
  color: var(--main-font-color);
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  border: none;
}

.expand-button:hover {
  background: var(--weak-border);
}

.row__icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.row__icon {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.row__arrow-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.row__arrow {
  color: var(--main-font-color);
  font-size: var(--body-font-size);
  font-weight: normal;
}

.row__demand {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-family: var(--main-font-family);
  color: var(--main-font-color);
  font-size: var(--body-font-size);
}

.row__crafter-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.row__crafter-icon {
  width: 32px;
  height: 32px;
  object-fit: contain;
  vertical-align: middle;
}

.row__crafter-multiplier-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.row__crafter-multiplier {
  color: var(--main-font-color);
  font-size: var(--body-font-size);
  font-weight: normal;
}

.row__crafter-count-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.row__crafter-count {
  font-family: var(--main-font-family);
  color: var(--main-font-color);
  font-size: var(--body-font-size);
  font-weight: normal;
}
</style>
