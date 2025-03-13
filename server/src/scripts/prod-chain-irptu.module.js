/**
 * Acts as a wrapper class to expose the IRPTU-submission-related functionality in the calculators module
 */

//import {recipes,validIDs} from "./recipes.module"
import * as Validators from "./validators.module"
import * as Calculators from "./irptu-calculators.module"

function addIRPTU(itemID, amount, prodChainObject) {
    var inputCopy = { ...prodChainObject };

    Validators.validateID(itemID)
    Validators.validateNumber(amount)
    Validators.validateProdChainObject(inputCopy)
    Validators.validateURPSAddition(amount)

    let prodChainData = inputCopy["prodChain"]
    let demandInfoOutput = {}
    Calculators.calculateIntermediaryDemand(itemID, amount, demandInfoOutput)
    Calculators.updateProductionChainDemand(prodChainData, demandInfoOutput)
    inputCopy["prodChain"] = prodChainData

    return inputCopy;
}

function subtractIRPTU(itemID, amount, prodChainObject) {
    var inputCopy = { ...prodChainObject };

    Validators.validateID(itemID)
    Validators.validateNumber(amount)
    Validators.validateProdChainObject(inputCopy)
    let prodChainData = inputCopy["prodChain"]
    Validators.validateURPSSubtraction(itemID, amount, prodChainData)

    let demandInfoOutput = {}
    Calculators.calculateIntermediaryDemand(itemID, amount, demandInfoOutput)
    Calculators.updateProductionChainDemand(prodChainData, demandInfoOutput)
    inputCopy["prodChain"] = prodChainData
    //     // removes input item from output if it's no longer required in any capacity
    // // useful post-subtraction
    // if(output[inputID]["Input URPS"] == 0 && output[inputID]["Output URPS"] == 0) {
    //     delete output[inputID];
    // }

    return inputCopy;
}

export {
    addIRPTU, subtractIRPTU
}