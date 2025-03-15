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

function recalculateTimeUnit(prodChainData, oldTimeUnit, newTimeUnit) {
    validateTimeUnit(newTimeUnit)

    let ratio = 1
    const timeUnitsInSeconds = {
        "second": 1,
        "minute": 60,
        "hour": 3600
    };
    ratio = timeUnitsInSeconds[oldTimeUnit] / timeUnitsInSeconds[newTimeUnit];

    for(itemID in prodChainData){
        prodChainData[itemID]["userDemand"] *= ratio
        prodChainData[itemID]["intermedDemand"] *= ratio

        for(intermedItemID in prodChainData[itemID]["dependencyItems"]){
            prodChainData[itemID]["dependencyItems"][intermedItemID] *= ratio
        }
    }
}

export {
    getUserDemand, recalculateTimeUnit
}