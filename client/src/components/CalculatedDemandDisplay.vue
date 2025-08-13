<template>
  <div class="CalculatedDemandDisplay-container">
    <h1 class="container__header">Production Chain Visualizer</h1>

    <div class="display" v-if="resourcesLoaded">
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
          v-for="(item, index) in depthwiseTraversal"
          :key="index"
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
      selectedTimeUnit: "" // Default value for the time unit
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
    graphifiedRep() {
      return LFS.graphifiedRep
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

.rows {
  display: flex;
  flex-direction: column;
  width: 730px;
  border-top: var(--medium-border);
}

.top-row {
  display: grid;
  grid-template-columns: 72px 194px 70px 170px 1fr;
  height: 40px;
  width: 730px;
  margin-bottom: 0;
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