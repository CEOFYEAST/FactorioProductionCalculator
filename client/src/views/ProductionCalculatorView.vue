<template>
    <div id="ProductionCalculatorView-root" class="root">

      <h2 v-if="!resourcesLoaded">Loading...</h2>

      <h2 v-if="resourcesLoaded">Calculator Controls</h2>
      <div v-if="resourcesLoaded" style="border: 2px solid black; margin-bottom: 10px; padding: 10px;">

        <h3>Update User Demand</h3>
        <div style="margin-bottom: 20px; border: 1px solid black; padding: 10px;">

          <div style="margin-bottom: 10px;">
            <label for="itemID">Enter Item ID</label>
            <input id="itemID" type="text" v-model="selectedItemID" style="margin-left: 10px;" />
          </div>

          <div style="margin-bottom: 10px;">
            <label for="selectedItemIRPTU">Enter Item IRPTU</label>
            <input id="selectedItemIRPTU" type="number" v-model="selectedItemIRPTU" style="margin-left: 10px;" />
          </div>

          <div style="margin-bottom: 10px;">
            <label for="itemID">Enter Request Time Unit</label>
            <input id="itemID" type="text" v-model="requestTimeUnit" style="margin-left: 10px;" />
          </div>

          <div>
            <button @click="addToFactory()" style="margin-right: 10px;">Add Specified Item to the Factory</button>
            <button @click="removeFromFactory()">Remove Specified Item from the Factory</button>
          </div>
        </div>

        <h3>Misc. Controls</h3>
        <div style="margin-bottom: 20px; border: 1px solid black; padding: 10px;">
          <div style="margin: 10px;">
            <button @click="clearFactory()">Clear Factory</button>
          </div>

          <div style="margin: 10px;">
            <button @click="addOneOfEach()">Add One of Each Item to the Factory</button>
          </div>
        </div>

        
        <h3>Recalculate Time Unit</h3>
        <div style="margin-bottom: 20px; border: 1px solid black; padding: 10px;">
            <label for="timeUnit">Select New Time Unit</label>
            <select id="timeUnit" v-model="selectedTimeUnit" @change="changeTimeUnit(selectedTimeUnit)" style="margin-left: 10px;">
              <option value="second">Second</option>
              <option value="minute">Minute</option>
              <option value="hour">Hour</option>
            </select>
        </div>
        

      </div>

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
  import { addValidationFailedListener } from '@ceofyeast/prodchaincalculators/validators'

  let LFS = {}
  
  export default {
    name: 'Production Calculator View',
    data() {
      return {
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
      handleValidationError
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