<template>
   <div class="CalculatedDemandDisplay-container">

    <h1 class="container__header">Production Chain Visualizer</h1>

      <h2 v-if="resourcesLoaded">Factory Data</h2>
      <div v-if="resourcesLoaded" style="border: 2px solid black; margin-bottom: 10px; padding: 10px;">

        <h3>Time Unit</h3>
        <div style="border: 1px solid black; margin-bottom: 10px;">{{ timeUnit }}</div>

        <h3>User Demand</h3>
        <div style="max-height: 300px; overflow-y: scroll; border: 1px solid gray; padding: 10px;">
          <div v-for="(value, key) in userDemand" :key="key" style="border: 1px solid black; margin-bottom: 10px;">
            <div>{{ key }}: {{ value }}</div>
          </div>
        </div>

        <h3>Production Chain</h3>
        <div style="max-height: 300px; overflow-y: scroll; border: 1px solid gray; padding: 10px;">
          <div v-for="(value, key) in prodChain" :key="key" style="border: 1px solid black; margin-bottom: 10px;">
            <div>{{ key }}: {{ value }}</div>
          </div>
        </div>

      </div>

    </div>

</template>

<script>
  import { useLoadedFactory } from '@/stores/loadedFactory'
  import { addRecipesLoadedListener } from '@ceofyeast/prodchaincalculators/recipes'

  let LFS = {}
  
  export default {
    name: 'Production Calculator View',
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

<style>
.CalculatedDemandDisplay-container {
    width: 50%;
    margin: auto;
    margin-top: none;
    margin-bottom: none;
}
.container__header {
    text-align: center;
    font-family: var(--stylized-font-family);
}
</style>