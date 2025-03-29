import { defineStore } from 'pinia'
import * as IRPTU from "@ceofyeast/prodchaincalculators/irptu"
import * as UTILITY from "@ceofyeast/prodchaincalculators/utility"

export const useLoadedFactory = defineStore('loadedFactory', {
    state: () => ({ 
        loadedFactory: UTILITY.createProductionChain(),
        userDemand: {},
        itemNamesAndIDs: {},
    }),
    getters: {
        timeUnit: (state) => state.loadedFactory.timeUnit,
        prodChain: (state) => state.loadedFactory.prodChain
    },
    actions: {
        refreshStoreState(){
            this.userDemand = UTILITY.getUserDemand(this.prodChain),
            this.itemNamesAndIDs = UTILITY.getItemNamesAndIDs()
        },
        clear(){
            this.loadedFactory = UTILITY.createProductionChain(this.loadedFactory.timeUnit)
            this.refreshStoreState()
        },
        setTimeUnit(newTimeUnit){
            UTILITY.recalculateTimeUnit(this.loadedFactory, newTimeUnit)
            this.refreshStoreState()
        },
        addDemand(itemID, amount, timeUnit){
            if (arguments.length === 3) {
                IRPTU.addIRPTU(itemID, amount, this.loadedFactory, timeUnit)
            }
            else {
                IRPTU.addIRPTU(itemID, amount, this.loadedFactory)
            }
            this.refreshStoreState()
        },
        subtractDemand(itemID, amount, timeUnit){
            if (arguments.length === 3) {
                IRPTU.subtractIRPTU(itemID, amount, this.loadedFactory, timeUnit)
            }
            else {
                IRPTU.subtractIRPTU(itemID, amount, this.loadedFactory)
            }
            this.refreshStoreState()
        }
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