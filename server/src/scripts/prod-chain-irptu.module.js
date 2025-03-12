/**
 * Acts as a wrapper class to expose the IRPTU-submission-related functionality in the calculators module
 */

import {recipes,validIDs} from "./recipes.module"
import * as Validators from "./validators.module"

function addIRPTU(itemID, amount, prodChainObject) {
    Validators.validateID(itemID)
    Validators.validateNumber(amount)
    Validators.validateProdChainObject(prodChainObject)
    Validators.validateURPSAddition(amount)

}

function subtractIRPTU(itemID, amount, prodChainObject) {
    Validators.validateID(itemID)
    Validators.validateNumber(amount)
    Validators.validateProdChainObject(prodChainObject)
    let prodChainData = prodChainObject["prodChain"]
    Validators.validateURPSSubtraction(itemID, amount, prodChainData)

    //     // removes input item from output if it's no longer required in any capacity
    // // useful post-subtraction
    // if(output[inputID]["Input URPS"] == 0 && output[inputID]["Output URPS"] == 0) {
    //     delete output[inputID];
    // }
}

function tryAddItemData(itemID, prodChainData) {
    Validators.validateID(itemID);
    Validators.validateObject(prodChainData);

    // adds ingredient representation to output if it doesn't already exist.
    if (!prodChainData.hasOwnProperty(itemID)) {
        let itemData = {
        userIRPTU: 0,
        intermIRPTU: 0,
        dependencyItems: {}
        };
        prodChainData[itemID] = itemData;
    }
}

export {
    addIRPTU, subtractIRPTU
}