<template>
  <div class="production-chain-row" :class="{ 'user-demand-item': hasUserDemand }">
    <div class="main-row-content">
      <div class="row__expander-container">
        <button @click="toggleExpanded" class="expand-button">
          {{ isExpanded ? '−' : '+' }}
        </button>
      </div>
      <div class="row__icon-container">
        <ItemTooltip :item-id="getItemIdFromPath(iconPath)">
          <img class="row__icon" :src="iconPath" />
        </ItemTooltip>
      </div>
      <div class="row__arrow-container">
        <span class="row__arrow">←</span>
      </div>
      <div class="row__demand">
        {{ demand }}
      </div>
      <div class="row__filler"/>
      <div class="row__crafter-icon-container">
        <ItemTooltip :item-id="getItemIdFromPath(crafterIconPath)">
          <img class="row__crafter-icon" :src="crafterIconPath" />
        </ItemTooltip>
      </div>
      <div class="row__crafter-multiplier-container">
        <span class="row__crafter-multiplier">×</span>
      </div>
      <div class="row__crafter-count-container">
        <span class="row__crafter-count">{{ formattedCrafterCount }}</span>
      </div>
      <div class="row__filler"/>
      <div class="row__belt-icon-container">
        <ItemTooltip :item-id="getItemIdFromPath(beltIconPath)">
          <img class="row__belt-icon" :src="beltIconPath" />
        </ItemTooltip>
      </div>
      <div class="row__belt-multiplier-container">
        <span class="row__belt-multiplier">×</span>
      </div>
      <div class="row__belt-count-container">
        <span class="row__belt-count">{{ formattedBeltCount }}</span>
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
import ItemTooltip from './ItemTooltip.vue'

export default {
  name: 'ProductionChainRow',
  components: {
    ProductionChainSubRows,
    ItemTooltip
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
    },
    belt: {
      type: String,
      default: ''
    },
    beltCount: {
      type: [String, Number],
      default: 0
    },
    beltIconPath: {
      type: String,
      default: ''
    },
    hasUserDemand: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isExpanded: false
    }
  },
  computed: {
    gridColumns() {
      return '50px 64px 64px 64px 64px 64px 64px 64px 64px 64px 64px 64px 1fr';
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
    },
    formattedBeltCount() {
      // Handle string values like "N/A"
      if (typeof this.beltCount === 'string') {
        return this.beltCount;
      }
      
      // Handle numeric values
      if (typeof this.beltCount === 'number' && !isNaN(this.beltCount)) {
        return parseFloat(this.beltCount.toFixed(2));
      }
      
      // Fallback for other cases
      return '0';
    }
  },
  methods: {
    toggleExpanded() {
      this.isExpanded = !this.isExpanded;
    },
    getItemIdFromPath(imagePath) {
      if (!imagePath) return '';
      
      // Extract filename from path
      const fileName = imagePath.split('/').pop();
      if (!fileName) return '';
      
      // Remove file extension and any prefix like "32px-"
      let itemId = fileName.replace(/\.(png|jpg|jpeg|gif)$/i, '');
      itemId = itemId.replace(/^32px-/, '');
      itemId = itemId.replace(/\.png$/, '');
      
      // Convert from filename format to item ID format
      // This handles cases where spaces might have been converted to underscores
      return itemId.toLowerCase().replace(/_/g, '-');
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

.row__belt-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.row__belt-icon {
  width: 32px;
  height: 32px;
  object-fit: contain;
  vertical-align: middle;
}

.row__belt-multiplier-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.row__belt-multiplier {
  color: var(--main-font-color);
  font-size: var(--body-font-size);
  font-weight: normal;
}

.row__belt-count-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.row__belt-count {
  font-family: var(--main-font-family);
  color: var(--main-font-color);
  font-size: var(--body-font-size);
  font-weight: normal;
}

/* User demand highlighting */
.production-chain-row.user-demand-item .main-row-content {
  background-color: #e8f4f8;
  border-left: 4px solid #007acc;
  box-shadow: 0 2px 4px rgba(0, 122, 204, 0.1);
}
</style>
