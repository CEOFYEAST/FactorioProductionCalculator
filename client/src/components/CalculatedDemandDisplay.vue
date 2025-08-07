<template>
  <div class="CalculatedDemandDisplay-container">
    <h1 class="container__header">Production Chain Visualizer</h1>

    <div class="display" v-if="resourcesLoaded">
      <!-- Time Unit Section - Above both columns -->
      <div class="display__time-section">
        <h3 class="display__section-title">Time Unit</h3>
        <div class="display__time-unit">{{ timeUnit }}</div>
      </div>

      <!-- Two-column layout for User Demand and Production Chain -->
      <div class="display__two-column">
        <!-- Left Column: User Demand -->
        <div class="display__column">
          <UserDemandDisplay :userDemand="userDemand" />
        </div>

        <!-- Right Column: Production Chain -->
        <div class="display__column">
          <ProductionChainDisplay :prodChain="prodChain" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useLoadedFactory } from '@/stores/loadedFactory'
import { addRecipesLoadedListener } from '@ceofyeast/prodchaincalculators/recipes'
import UserDemandDisplay from '@/components/UserDemandDisplay.vue'
import ProductionChainDisplay from '@/components/ProductionChainDisplay.vue'

let LFS = {}

export default {
  name: 'CalculatedDemandDisplay',
  components: {
    UserDemandDisplay,
    ProductionChainDisplay
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
  },
  methods: {
    handleResourcesLoaded(){
      this.resourcesLoaded = true
    },
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

.factory-data__title {
  margin-bottom: 15px;
}

.display {
  padding: 15px;
  border-radius: 4px;
}

/* Time unit section - full width above the columns */
.display__time-section {
  margin-bottom: 20px;
  width: 100%;
}

.display__section-title {
  margin-top: 0;
  margin-bottom: 10px;
  font-family: var(--main-font-family);
}

.display__time-unit {
  border: 1px solid black;
  padding: 10px;
  background-color: var(--secondary-color);
  border-radius: 4px;
  font-family: var(--main-font-family);
  font-size: var(--body-font-size);
}

/* Two-column layout container */
.display__two-column {
  display: flex;
  gap: 20px; /* Space between columns */
  width: 100%;
}

/* Each column takes up half the space */
.display__column {
  flex: 1;
  min-width: 0; /* Prevents flex items from overflowing */
}

/* Responsive layout for smaller screens */
@media (max-width: var(--mobile-breakpoint)) {
  .display__two-column {
    flex-direction: column;
  }
  
  .display__column {
    margin-bottom: 20px;
  }
}
</style>