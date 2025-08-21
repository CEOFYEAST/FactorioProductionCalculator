<template>
  <div class="CalculatedDemandDisplay-container">
    <h1 class="container__header">Production Chain Visualizer</h1>

    <div class="display" v-if="resourcesLoaded">
      <!-- No Items Message -->
      <div v-if="!hasItems" class="no-items-message">
        <div class="no-items-content">
          <h3>No items have been added to the factory</h3>
          <p>Add some items to your production demand to see the production chain.</p>
        </div>
      </div>

      <!-- Production Chain Display -->
      <div v-else>
        <!-- Search Section -->
        <div class="search-section">
          <div class="search-container">
            <input 
              class="search-input"
              type="text" 
              v-model="searchQuery"
              placeholder="Search items..."
            />
            <span class="search-icon">🔍</span>
          </div>
          <div class="search-results-info" v-if="searchQuery">
            Showing {{ filteredDepthwiseTraversal.length }} of {{ depthwiseTraversal.length }} items
          </div>
        </div>

        <div class="production-chain-wrapper">
          <div class="top-row">
            <div class="top-row__filler-left"></div>
            <div class="top-row__items-header">
              Items per {{ timeUnit }}
            </div>
            <div class="top-row__spacer"></div>
            <div class="top-row__crafter-header">
              Crafter Counts
            </div>
            <div class="top-row__filler-right"></div>
          </div>
          <div class="rows">
            <ProductionChainRow
              v-for="(item, index) in filteredDepthwiseTraversal"
              :key="index"
              :class="{ 'first-row': index === 0 }"
              :icon-path="getThumbPath(item)"
              :demand="getItemDemand(item)"
              :dependent-items="getDependentItems(item)"
              :ingredient-items="getIngredientItems(item)"
              :prod-chain="prodChain"
              :crafter="getCrafter(item)"
              :crafter-count="getCrafterCount(item)"
              :crafter-icon-path="getCrafterThumbPath(item)"
            />
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { useLoadedFactory } from '@/stores/loadedFactory'
import { addRecipesLoadedListener } from '@ceofyeast/prodchaincalculators/recipes'
import ProductionChainRow from './ProductionChainRow.vue'

let LFS = {}

export default {
  name: 'CalculatedDemandDisplay',
  components: {
    ProductionChainRow
  },
  data() {
    return {
      resourcesLoaded: false,
      requestTimeUnit: "minute",
      selectedTimeUnit: "", // Default value for the time unit
      searchQuery: ""
    }
  },
  computed: {
    userDemand(){
      return LFS.userDemand
    },
    prodChain(){
      return LFS.prodChain
    },
    timeUnit(){
      return LFS.timeUnit
    },
    depthwiseTraversal() {
      return LFS.depthwiseTraversal
    },
    filteredDepthwiseTraversal() {
      if (!this.searchQuery) {
        return this.depthwiseTraversal
      }
      return this.depthwiseTraversal.filter(item => 
        item.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    },
    graphifiedRep() {
      return LFS.graphifiedRep
    },
    hasItems() {
      return this.depthwiseTraversal && this.depthwiseTraversal.length > 0
    }
  },
  methods: {
    handleResourcesLoaded(){
      this.resourcesLoaded = true
    },
    getThumbPath(item) {
      if (!this.prodChain[item]) return '';
      return this.prodChain[item]["thumbPath"] || '';
    },
    getItemDemand(item) {
      if (!this.prodChain[item]) return 0;
      const {userIRPTU, intermIRPTU } = this.prodChain[item]
      console.log("UserIRPTU: ", userIRPTU, "intermIRPTU", intermIRPTU)
      const total = userIRPTU + intermIRPTU
      return parseFloat(total.toFixed(3))
    },
    getDependentItems(item) {
      if (!this.prodChain[item]) return {};
      return this.prodChain[item]["dependentItems"]
    },
    getIngredientItems(item) {
      if (!this.prodChain[item]) return {};
      return this.prodChain[item]["ingredientItems"]
    },
    getCrafter(item) {
      if (!this.prodChain[item]) return '';
      return this.prodChain[item]["crafter"] || '';
    },
    getCrafterCount(item) {
      if (!this.prodChain[item]) return 0;
      const count = this.prodChain[item]["crafterCount"];
      
      // Handle string values like "N/A"
      if (typeof count === 'string') {
        return count;
      }
      
      // Handle numeric values
      if (typeof count === 'number' && !isNaN(count)) {
        return parseFloat(count.toFixed(3));
      }
      
      // Fallback for other cases
      return 0;
    },
    getCrafterThumbPath(item) {
      if (!this.prodChain[item]) return '';
      return this.prodChain[item]["crafterThumbPath"] || '';
    }
  },
  beforeCreate(){
    // essential to set before creation so that the computed properties can refer to the proper values
    LFS = useLoadedFactory()
  },
  created(){
    import('@ceofyeast/prodchaincalculators/recipes').then((recipesMod) => {
      this.resourcesLoaded = recipesMod.recipesLoaded
    })
    addRecipesLoadedListener(this.handleResourcesLoaded)
  }
}
</script>

<style scoped>
.CalculatedDemandDisplay-container {
  width: 90%;
  margin: auto;
}

.container__header {
  text-align: center;
  font-family: var(--stylized-font-family);
  margin-bottom: 20px;
}

.display {
  padding: 15px;
  border-radius: 4px;
}

/* Search Section Styles */
.search-section {
  margin-bottom: 20px;
}

/* No Items Message Styles */
.no-items-message {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  padding: 40px 20px;
}

.no-items-content {
  text-align: center;
  max-width: 600px;
}

.no-items-content h3 {
  font-family: var(--main-font-family);
  font-size: 1.5em;
  color: var(--main-text-color);
  margin-bottom: 15px;
  font-weight: 600;
}

.no-items-content p {
  font-family: var(--main-font-family);
  font-size: var(--body-font-size);
  color: #666;
  line-height: 1.5;
  margin: 0;
}

.search-container {
  position: relative;
  width: 300px;
  margin: 0 auto;
}

.search-input {
  width: 100%;
  padding: 10px 40px 10px 12px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-family: var(--main-font-family);
  font-size: var(--body-font-size);
  background-color: white;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

.search-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.search-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: #666;
  pointer-events: none;
}

.search-results-info {
  text-align: center;
  margin-top: 8px;
  font-family: var(--main-font-family);
  font-size: 0.9em;
  color: #666;
  font-style: italic;
}

.production-chain-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
}

.rows {
  display: flex;
  flex-direction: column;
  width: 900px;
  max-height: 500px;
  overflow-y: auto;
  padding-top: 40px;
  margin-top: -40px;
}

.top-row {
  display: grid;
  grid-template-columns: 72px 194px 70px 170px 1fr;
  height: 40px;
  width: 900px;
  margin-bottom: 0;
  z-index: 10;
  background: white;
  border-bottom: var(--medium-border);
}

.top-row__filler-left {
  grid-column: 1;
}

.top-row__items-header {
  grid-column: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  font-family: var(--main-font-family);
  color: var(--main-font-color);
  font-size: var(--header-font-size);
}

.top-row__spacer {
  grid-column: 3;
}

.top-row__crafter-header {
  grid-column: 4;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  font-family: var(--main-font-family);
  color: var(--main-font-color);
  font-size: var(--header-font-size);
}

.top-row__filler-right {
  grid-column: 5;
}

</style>