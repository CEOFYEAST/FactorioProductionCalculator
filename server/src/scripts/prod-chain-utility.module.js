/**
 * Acts as a wrapper class to expose the non-IRPTU-submission-related functionality in the calculators module
 */

import {recipes,validIDs} from "./recipes.module"

function getUserDemand(prodChainObject) {}
function recalculateTimeUnit(prodChainObject, newTimeUnit) {}

export {
    getUserDemand, recalculateTimeUnit
}