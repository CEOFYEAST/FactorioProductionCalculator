<template>
  <div class="sub-rows">
    <div class="sub-rows-container">
      <!-- Dependent relationships (dependent ← this item) -->
      <div 
        v-for="[dependentName, amount] in dependentItemsList" 
        :key="`dependent-${dependentName}`"
        class="sub-row"
      >
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
        <div class="sub-row__amount">{{ parseFloat(amount.toFixed(3)) }}</div>
      </div>

      <!-- Ingredient relationships (this item ← ingredient) -->
      <div 
        v-for="[ingredientName, amount] in ingredientItemsList" 
        :key="`ingredient-${ingredientName}`"
        class="sub-row"
      >
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
        <div class="sub-row__amount">{{ parseFloat(amount.toFixed(3)) }}</div>
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
  padding-left: 25px;
  width: 50%;
  margin-top: 8px;
}

.sub-rows-container {
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  margin-bottom: 15px;
}

.sub-row {
  display: grid;
  grid-template-columns: 40px 32px 40px 80px;
  height: 40px;
  align-items: center;
  gap: 12px;
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
</style>
