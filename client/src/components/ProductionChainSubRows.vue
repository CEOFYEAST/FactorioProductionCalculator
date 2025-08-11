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
          <img class="sub-row__icon" :src="getDependentIconPath(dependentName)" />
        </div>
        <div class="sub-row__arrow">←</div>
        <div class="sub-row__icon-container">
          <img class="sub-row__icon" :src="currentItemIconPath" />
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
          <img class="sub-row__icon" :src="currentItemIconPath" />
        </div>
        <div class="sub-row__arrow">←</div>
        <div class="sub-row__icon-container">
          <img class="sub-row__icon" :src="getIngredientIconPath(ingredientName)" />
        </div>
        <div class="sub-row__amount">{{ parseFloat(amount.toFixed(3)) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductionChainSubRows',
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
      const { thumbDir, thumbName } = this.prodChain[ingredientName];
      return `/assets/client_thumbs/${thumbDir}/${thumbName}`;
    },
    getDependentIconPath(dependentName) {
      if (!this.prodChain[dependentName]) return '';
      const { thumbDir, thumbName } = this.prodChain[dependentName];
      return `/assets/client_thumbs/${thumbDir}/${thumbName}`;
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
