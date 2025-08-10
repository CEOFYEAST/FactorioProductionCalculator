<template>
  <div class="CalculatedDemandDisplay-container">
    <h1 class="container__header">Production Chain Visualizer</h1>

    <div class="display" v-if="resourcesLoaded">
      <div class="top-row">
        <div class="top-row__description">
          Items per {{ timeUnit }}
        </div>
        <div class="top-row__filler"/>
      </div>
      <div class="rows">
        <ProductionChainRow
          v-for="(item, index) in depthwiseTraversal"
          :key="index"
          :icon-path="getThumbsPath(item)"
          :demand="getItemDemand(item)"
          :dependent-items="getDependentItems(item)"
          :ingredient-items="getIngredientItems(item)"
          :prod-chain="prodChain"
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
    getThumbsPath(item) {
      if (!this.prodChain[item]) return '';
      const { thumbDir, thumbName } = this.prodChain[item];
      return `/assets/client_thumbs/${thumbDir}/${thumbName}`;
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
  width: 500px;
  border-top: var(--medium-border);
}

.top-row {
  display: grid;
  grid-template-columns: 50px 64px 120px 1fr;
  height: 40px;
  width: 500px;
  margin-bottom: 0;
}

.top-row__description {
  grid-column: 2 / 5;
  display: flex;
  align-items: center;
  padding: 0 8px;
  font-family: var(--main-font-family);
  color: var(--main-font-color);
  font-size: var(--header-font-size);
}

.top-row__filler {
  grid-column: 4;
}
</style>