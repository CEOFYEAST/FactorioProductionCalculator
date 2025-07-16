<template>
   <div class="UserInputMenu-container">

        <h1 class="container__header">Required Demand Input Form</h1>

        <div v-if="!(validationErrorMssg === '')" style="background-color: red; color: white; padding: 20px; border-radius: 5px; z-index: 1000;">
            <span>ERROR: {{ validationErrorMssg }}</span>
            <button @click="validationErrorMssg = ''" style="margin-left: 20px; background-color: white; color: red; border: none; cursor: pointer;">Close</button>
        </div>

        <h2 v-if="!resourcesLoaded">Loading Recipes...</h2>

        <div v-if="resourcesLoaded" style="margin-bottom: 10px; padding: 10px;">

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
                <label for="requestTimeUnit">Select Request Time Unit</label>
                <select id="requestTimeUnit" v-model="requestTimeUnit" style="margin-left: 10px;">
                    <option value="second">Second</option>
                    <option value="minute">Minute</option>
                    <option value="hour">Hour</option>
                </select>
                </div>

                <div>
                <button @click="addToFactory()" style="margin-right: 10px;">Add Specified Item to the Factory</button>
                <button @click="removeFromFactory()">Remove Specified Item from the Factory</button>
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

            <h3>Misc. Controls</h3>
            <div style="margin-bottom: 20px; border: 1px solid black; padding: 10px;">
                <div style="margin: 10px;">
                <button @click="clearFactory()">Clear Factory</button>
                </div>

                <div style="margin: 10px;">
                <button @click="addOneOfEach()">Add One of Each Item to the Factory</button>
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
      addOneOfEach(){
        LFS.refreshStoreState()
        for(let i = 0; i < LFS.itemIDs.length; i++){
          LFS.addDemand(LFS.itemIDs[i], 1)
        }
      },
      handleResourcesLoaded(){
        this.resourcesLoaded = true
      },
      handleValidationFailed(err){
        this.validationErrorMssg = err.message
      },
      changeTimeUnit(newTimeUnit){
        LFS.setTimeUnit(newTimeUnit)
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
      addValidationFailedListener(this.handleValidationFailed)
    }
  }
</script>

<style>
.UserInputMenu-container {
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