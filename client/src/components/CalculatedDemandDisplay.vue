<template>
  <div class="CalculatedDemandDisplay-container">
    <h1 class="container__header">Production Chain Visualizer</h1>

    <div class="display" v-if="resourcesLoaded">
      <!-- Time Unit Section - Above both columns -->
      <div class="display__time-section">
        <h3 class="display__section-title">Time Unit</h3>
        <div class="display__time-unit">{{ timeUnit }}</div>
      </div>
    </div>

    <div class="display" v-if="resourcesLoaded"></div>

  </div>
</template>

<script>
import { useLoadedFactory } from '@/stores/loadedFactory'
import { addRecipesLoadedListener } from '@ceofyeast/prodchaincalculators/recipes'

let LFS = {}

export default {
  name: 'CalculatedDemandDisplay',
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
</style>