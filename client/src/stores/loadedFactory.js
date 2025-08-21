import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import * as IRPTU from "@ceofyeast/prodchaincalculators/irptu"
import * as UTILITY from "@ceofyeast/prodchaincalculators/utility"
import * as TRAVERSAL from "@ceofyeast/prodchaincalculators/traversal"
import {addRecipesLoadedListener, recipesLoaded} from "@ceofyeast/prodchaincalculators/recipes"
import recipes from "@ceofyeast/prodchaincalculators/recipes"

export const useLoadedFactory = defineStore('loadedFactory', () => {
    const loadedFactory = ref(UTILITY.createProductionChainObject())
    const userDemand = ref({})
    const graphifiedRep = ref({})
    const depthwiseTraversal = ref({})
    const itemIDs = ref({})
    const itemNamesAndIDs = ref({})
    const recipesData = ref(recipes)

    const timeUnit = computed(() => loadedFactory.value.timeUnit)
    const crafterConfig = computed(() => loadedFactory.value.crafterConfig)
    const prodChain = computed(() => loadedFactory.value.prodChain)

    addDemand("advanced-circuit", 10)

    function initializeRecipesData(){
        console.log("Recipes loaded listener called")
        itemIDs.value = UTILITY.getItemIDs()
        itemNamesAndIDs.value = UTILITY.getItemNamesAndIDs()
    }

    function refreshStoreState() {
        try {
            userDemand.value = UTILITY.getUserDemand(prodChain.value)
            depthwiseTraversal.value = TRAVERSAL.buildLongestPathTraversal(prodChain.value)
            //graphifiedRep.value = GRAPH.getProdChainAsGraph(loadedFactory)
        } catch(err) {
            if(err.name != "ValidationError") throw(err)
        }
    }

    function loadFactoryData(toLoad){
        loadedFactory.value = toLoad
        refreshStoreState()
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

    function setCrafterConfig(newConfig) {
        loadedFactory.value = UTILITY.setCrafterConfigOfProdChain(newConfig, loadedFactory.value)
        refreshStoreState()
    }

    function getItemIconPath(name) {
        const thumbDir = name.replace(/\s+/g, '_') + '.png';
        const thumbName = `32px-${thumbDir}`;
        return `/assets/client_thumbs/${thumbDir}/${thumbName}`;
    }

    addRecipesLoadedListener(initializeRecipesData)

    if(recipesLoaded) initializeRecipesData();

    return {
        loadedFactory,
        userDemand,
        itemIDs,
        itemNamesAndIDs,
        recipes: recipesData,
        timeUnit,
        prodChain,
        graphifiedRep,
        depthwiseTraversal,
        refreshStoreState,
        clear,
        setTimeUnit,
        addDemand,
        subtractDemand,
        loadFactoryData,
        getItemIconPath,
        setCrafterConfig
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