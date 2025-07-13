<template>
    <div class="ProductionCalculatorView-container">

      <div class="container__nav">
        <TheSideNav/>
      </div>

      <div class="container__calculator">

      </div>

    </div>
  </template>

<script>
  import TheSideNav from '@/components/TheSideNav.vue'
  import { useLoadedFactory } from '@/stores/loadedFactory'
  import { addRecipesLoadedListener } from '@ceofyeast/prodchaincalculators/recipes'
  import { addValidationFailedListener } from '@ceofyeast/prodchaincalculators/validators'

  let LFS = {}
  
  export default {
    name: 'Production Calculator View',
    components: {
      TheSideNav: TheSideNav
    },
    data() {
      return {
        validationErrorMssg: "",
        resourcesLoaded: false,
        selectedItemID: "inserter",
        selectedItemIRPTU: 10,
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
      clearFactory(){
        LFS.clear()
      },
      addToFactory(){
        LFS.addDemand(this.selectedItemID, this.selectedItemIRPTU, this.requestTimeUnit)
      },
      removeFromFactory(){
        LFS.subtractDemand(this.selectedItemID, this.selectedItemIRPTU, this.requestTimeUnit)
      },
      changeTimeUnit(newTimeUnit){
        LFS.setTimeUnit(newTimeUnit)
      },
      addOneOfEach(){
        LFS.refreshStoreState()
        for(let i = 0; i < LFS.itemIDs.length; i++){
          LFS.addDemand(LFS.itemIDs[i], 1)
        }
      },
      handleResourcesLoaded(){
        this.resourcesLoaded = true
      },
      handleValiationFailed(err){
        this.validationErrorMssg = err.message
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
      addValidationFailedListener(this.handleValiationFailed)
    }
  }
</script>

<style scoped>
.ProductionCalculatorView-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  min-width: 100%;
}
.container__nav {
  height: 100%;
  min-height: 100%;
}
.container__calculator {
  flex-grow: 1;
}
</style>
  

<!--
Loading/Reloading
    Will need a method for loading a factory into the view
    - can be called by a lifecycle hook
    Will need to update various things whenever a factory is loaded
    - menus will need to be refreshed
    - local lists of items, such as a local list of input items, will need to be refreshed
    - the actual components representing the nodes of the factory will need to be refreshed
    Will need a method for reloading a factory
    - could just re-use the loading method, but it could lend to efficiency and understandibility if I seperate the two 

Menus
    Could use a form that redirects to a method instead of an HTTPS request for the menus

Node Output Data
 - The # of crafters required to meet the node’s demand
 - The node’s demand
 - Visual link to the other “child” nodes that require the given “parent” node
 - The portion of the parent node’s demand required by each child node


-->

<!--

LoadFactory()
ReloadFactory()

RefreshNodes()
RefreshMenus()
RefreshInputs()

-->