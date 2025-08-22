<template>
  <div class="sub-rows">
    <div class="sub-rows-container">
      <!-- Dependent relationships (dependent ← this item) -->
      <div 
        v-for="[dependentName, dependentData] in dependentItemsList" 
        :key="`dependent-${dependentName}`"
        class="sub-row"
      >
        <div class="sub-row__filler"></div>
        <div class="sub-row__icon-container">
          <ItemTooltip :item-id="getItemIdFromPath(getDependentIconPath(dependentName))">
            <img class="sub-row__icon" :src="getDependentIconPath(dependentName)" />
          </ItemTooltip>
        </div>
        <div class="sub-row__arrow">←</div>
        <div class="sub-row__icon-container">
          <ItemTooltip :item-id="getItemIdFromPath(currentItemIconPath)">
            <img class="sub-row__icon" :src="currentItemIconPath" />
          </ItemTooltip>
        </div>
        <div class="sub-row__amount">{{ parseFloat(dependentData["IRPTU"].toFixed(3)) }}</div>
        <div class="sub-row__spacer"></div>
        <div class="sub-row__crafter-icon-container">
          <ItemTooltip :item-id="getItemIdFromPath(dependentData.crafterThumbPath)">
            <img class="sub-row__crafter-icon" :src="dependentData.crafterThumbPath" />
          </ItemTooltip>
        </div>
        <div class="sub-row__crafter-multiplier-container">
          <span class="sub-row__crafter-multiplier">×</span>
        </div>
        <div class="sub-row__crafter-count-container">
          <span class="sub-row__crafter-count">{{ formatCrafterCount(dependentData.crafterCount) }}</span>
        </div>
        <div class="sub-row__belt-icon-container">
          <ItemTooltip :item-id="getItemIdFromPath(dependentData.beltThumbPath)">
            <img class="sub-row__belt-icon" :src="dependentData.beltThumbPath" />
          </ItemTooltip>
        </div>
        <div class="sub-row__belt-multiplier-container">
          <span class="sub-row__belt-multiplier">×</span>
        </div>
        <div class="sub-row__belt-count-container">
          <span class="sub-row__belt-count">{{ formatBeltCount(dependentData.beltCount) }}</span>
        </div>
      </div>

      <!-- Ingredient relationships (this item ← ingredient) -->
      <div 
        v-for="[ingredientName, ingredData] in ingredientItemsList" 
        :key="`ingredient-${ingredientName}`"
        class="sub-row"
      >
        <div class="sub-row__filler"></div>
        <div class="sub-row__icon-container">
          <ItemTooltip :item-id="getItemIdFromPath(currentItemIconPath)">
            <img class="sub-row__icon" :src="currentItemIconPath" />
          </ItemTooltip>
        </div>
        <div class="sub-row__arrow">←</div>
        <div class="sub-row__icon-container">
          <ItemTooltip :item-id="getItemIdFromPath(getIngredientIconPath(ingredientName))">
            <img class="sub-row__icon" :src="getIngredientIconPath(ingredientName)" />
          </ItemTooltip>
        </div>
        <div class="sub-row__amount">{{ parseFloat(ingredData["IRPTU"].toFixed(3)) }}</div>
        <div class="sub-row__spacer"></div>
        <div class="sub-row__crafter-icon-container">
          <ItemTooltip :item-id="getItemIdFromPath(ingredData.crafterThumbPath)">
            <img class="sub-row__crafter-icon" :src="ingredData.crafterThumbPath" />
          </ItemTooltip>
        </div>
        <div class="sub-row__crafter-multiplier-container">
          <span class="sub-row__crafter-multiplier">×</span>
        </div>
        <div class="sub-row__crafter-count-container">
          <span class="sub-row__crafter-count">{{ formatCrafterCount(ingredData.crafterCount) }}</span>
        </div>
        <div class="sub-row__belt-icon-container">
          <ItemTooltip :item-id="getItemIdFromPath(ingredData.beltThumbPath)">
            <img class="sub-row__belt-icon" :src="ingredData.beltThumbPath" />
          </ItemTooltip>
        </div>
        <div class="sub-row__belt-multiplier-container">
          <span class="sub-row__belt-multiplier">×</span>
        </div>
        <div class="sub-row__belt-count-container">
          <span class="sub-row__belt-count">{{ formatBeltCount(ingredData.beltCount) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ItemTooltip from './ItemTooltip.vue'

export default {
  name: 'ProductionChainSubRows',
  components: {
    ItemTooltip
  },
  props: {
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
    currentItemIconPath: {
      type: String,
      default: ''
    }
  },
  computed: {
    dependentItemsList() {
      return Object.entries(this.dependentItems);
    },
    ingredientItemsList() {
      return Object.entries(this.ingredientItems);
    }
  },
  methods: {
    getIngredientIconPath(ingredientName) {
      if (!this.prodChain[ingredientName]) return '';
      return this.prodChain[ingredientName]["thumbPath"] || '';
    },
    getDependentIconPath(dependentName) {
      if (!this.prodChain[dependentName]) return '';
      return this.prodChain[dependentName]["thumbPath"] || '';
    },
    formatCrafterCount(count) {
      // Handle string values like "N/A"
      if (typeof count === 'string') {
        return count;
      }
      
      // Handle numeric values
      if (typeof count === 'number' && !isNaN(count)) {
        return parseFloat(count.toFixed(3));
      }
      
      // Fallback for other cases
      return '0';
    },
    formatBeltCount(count) {
      // Handle string values like "N/A"
      if (typeof count === 'string') {
        return count;
      }
      
      // Handle numeric values
      if (typeof count === 'number' && !isNaN(count)) {
        return parseFloat(count.toFixed(3));
      }
      
      // Fallback for other cases
      return '0';
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
.sub-rows {
  width: 100%;
  background-color: ghostwhite
}

.sub-rows-container {
  display: flex;
  flex-direction: column;
  padding-bottom: 15px;
  padding-top: 15px;
  border-top: var(--medium-border);
}

.sub-row {
  display: grid;
  grid-template-columns: 90px 40px 32px 40px 70px 40px 40px 24px 80px 40px 24px 80px;
  height: 40px;
  align-items: center;
  gap: 8px;
  border-bottom: var(--weak-border);
}

.sub-row:last-child {
  border-bottom: none;
}

.sub-row__icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.sub-row__icon {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.sub-row__arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: var(--main-font-color);
  font-weight: bold;
}

.sub-row__amount {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--main-font-family);
  color: var(--main-font-color);
  font-size: var(--main-font-size)
}

.sub-row__crafter-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.sub-row__crafter-icon {
  width: 32px;
  height: 32px;
  object-fit: contain;
  vertical-align: middle;
}

.sub-row__crafter-multiplier-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.sub-row__crafter-multiplier {
  color: var(--main-font-color);
  font-size: var(--body-font-size);
  font-weight: normal;
}

.sub-row__crafter-count-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.sub-row__crafter-count {
  font-family: var(--main-font-family);
  color: var(--main-font-color);
  font-size: var(--body-font-size);
  font-weight: normal;
}

.sub-row__belt-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.sub-row__belt-icon {
  width: 32px;
  height: 32px;
  object-fit: contain;
  vertical-align: middle;
}

.sub-row__belt-multiplier-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.sub-row__belt-multiplier {
  color: var(--main-font-color);
  font-size: var(--body-font-size);
  font-weight: normal;
}

.sub-row__belt-count-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.sub-row__belt-count {
  font-family: var(--main-font-family);
  color: var(--main-font-color);
  font-size: var(--body-font-size);
  font-weight: normal;
}
</style>
