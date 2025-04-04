import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import * as IRPTU from "@ceofyeast/prodchaincalculators/irptu"
import * as UTILITY from "@ceofyeast/prodchaincalculators/utility"
import {addRecipesLoadedListener, recipesLoaded} from "@ceofyeast/prodchaincalculators/recipes"

export const useLoadedFactory = defineStore('loadedFactory', () => {
    const loadedFactory = ref(UTILITY.createProductionChainObject())
    const userDemand = ref({})
    const itemIDs = ref({})
    const itemNamesAndIDs = ref({})

    const timeUnit = computed(() => loadedFactory.value.timeUnit)
    const prodChain = computed(() => loadedFactory.value.prodChain)

    function initializeRecipesData(){
        console.log("Recipes loaded listener called")
        itemIDs.value = UTILITY.getItemIDs()
        itemNamesAndIDs.value = UTILITY.getItemNamesAndIDs()
    }

    function refreshStoreState() {
        try {
            userDemand.value = UTILITY.getUserDemand(prodChain.value)
        } catch(err) {
            if(err.name != "ValidationError") throw(err)
        }
    }

    function clear() {
        try {
            loadedFactory.value = UTILITY.createProductionChainObject(loadedFactory.value.timeUnit)
        } catch(err) {
            if(err.name != "ValidationError") throw(err)
        }
        
        refreshStoreState()
    }

    function setTimeUnit(newTimeUnit) {
        try {
            UTILITY.recalculateTimeUnit(loadedFactory.value, newTimeUnit)
        } catch(err) {
            if(err.name != "ValidationError") throw(err)
        }
        
        refreshStoreState()
    }

    function addDemand(itemID, amount, timeUnit) {
        if (arguments.length === 3) {
            try {
                IRPTU.addIRPTU(itemID, amount, loadedFactory.value, timeUnit)
            } catch(err) {
                if(err.name != "ValidationError") throw(err)
            }
        } else {
            try {
                IRPTU.addIRPTU(itemID, amount, loadedFactory.value)
            } catch(err) {
                if(err.name != "ValidationError") throw(err)
            }
        }
        refreshStoreState()
    }

    function subtractDemand(itemID, amount, timeUnit) {
        if (arguments.length === 3) {
            try {
                IRPTU.subtractIRPTU(itemID, amount, loadedFactory.value, timeUnit)
            } catch(err) {
                if(err.name != "ValidationError") throw(err)
            }
        } else {
            try {
                IRPTU.subtractIRPTU(itemID, amount, loadedFactory.value)
            } catch(err) {
                if(err.name != "ValidationError") throw(err)
            }
        }
        refreshStoreState()
    }

    addRecipesLoadedListener(initializeRecipesData)

    if(recipesLoaded) initializeRecipesData();

    return {
        loadedFactory,
        userDemand,
        itemIDs,
        itemNamesAndIDs,
        timeUnit,
        prodChain,
        refreshStoreState,
        clear,
        setTimeUnit,
        addDemand,
        subtractDemand
    }
})



/**
 * Will contain the loaded factory
 * 
 * The factory will be initialized to an empty object
 * 
 * Will expose methods for IRPTU requests
 * - Method for adding an input
 * - Method for removing an input
 * 
 * Will expose a list of user-demand input
 * - Will be refreshed using a method from the modules whenever the loaded factory is updated
 * 
 * Will expose a list of valid item IDs
 * 
 * Will have access to all the methods of the calculator module
 * - All the CORS on the factory object itself will be carried out in this module
 * - The loaded factory store will simply expose the methods listed above
 * 
 * Alternatives/Improvements
 * - Ability to remove portions, or all of the IRPTU for any given item
 * - Storing inputs seperate from the loaded factory data object so they don't have to be parsed out every time they're required
 * - Could use cookies to maintain the loaded factory between sessions
 */

/**

Object LoadedFactory
TimeUnit TimeUnit
List<Object> UserInputs
List<String> ValidIDs

AddInput(string ItemID, uint amount, TimeUnit tU)
RemoveInput(string ItemID, uint amount)
HandleFactoryUpdate()
LoadFactory(Object toLoad)
ClearFactory()

 */