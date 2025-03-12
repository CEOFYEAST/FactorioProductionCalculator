import {recipes,validIDs} from "./recipes.module"
import * as Validators from "./validators.module"

function addIRPTU(itemID, amount, prodChainObject) {
    Validators.validateID(itemID)
    Validators.validateProdChainObject(prodChainObject)
    if(amount <= 0) {
        let err = Error("Invalid Addition Amount\n");
        throw err.stack;
    }


}

function subtractIRPTU(itemID, amount, prodChainObject) {
    Validators.validateID(itemID)
    Validators.validateProdChainObject(prodChainObject)
    let prodChainData = prodChainObject["prodChain"]
    validateURPSSubtraction(itemID, amount, prodChainData)

    
}

function validateURPSSubtraction(itemID, amount, prodChainData){
    if (prodChainData.hasOwnProperty(itemID)) {
        itemData = prodChainData[itemID];
        existingItemDemand = itemData["itermIRPTU"];

    // attempting to remove more input URPS than the input item already has
    if (amount > existingItemDemand) {
        let err = Error("Cannot remove more input URPS than the item already has, so must be less than or equal to " + existingInputURPS + "\n");
        throw err.stack;
    }
    }
    // attempting to remove URPS from input item that doesn't yet exist in output (its not already required)
    else {
    let err = Error("Cannot remove URPS from input item that doesn't already exist\n");
    throw err.stack;
    }
}

export {
    addIRPTU, subtractIRPTU
}