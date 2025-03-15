/**
 * Acts as a wrapper class to expose the non-IRPTU-submission-related functionality in the calculators module
 */

import {recipes,validIDs} from "./recipes.module.js"
import * as validators from "./validators.module.js"

function getUserDemand(prodChainData) {
    let userDemandData = {}
    for(let itemID in prodChainData){
        let itemUserDemand = prodChainData[itemID]["userIRPTU"]
        if(itemUserDemand > 0) userDemandData[itemID] = itemUserDemand
    }
    return userDemandData
}

function recalculateTimeUnit(prodChainData, newTimeUnit) {}

export {
    getUserDemand, recalculateTimeUnit
}