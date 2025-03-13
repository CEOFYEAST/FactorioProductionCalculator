import {recipes,validIDs} from "./recipes.module.js"

function calculateIntermediaryDemand(reqItem_ID, reqItem_IRPTU, demandOutput){
    let reqItem_Info = recipes[reqItem_ID]; // general info about item
    let reqItem_Type = reqItem_Info["Type"]; // type of item i.e. Machinery, Intermediate product

    // base case
    if (reqItem_Type == "Resource" || reqItem_Type == "Liquid") {
        return;
    }

    let reqItem_Recipe = reqItem_Info["recipe"]; // info about how to craft item
    let reqItem_IPPC = reqItem_Recipe["yield"]; // items produced per craft
    let reqItem_CRPTU = reqItem_IRPTU / reqItem_IPPC; // crafts required per time unit 
    let reqItem_Intermediaries = reqItem_Recipe["ingredients"]; // info about intermediary items used to craft the reqItem

    // runs for every intermediary item
    for (let key in reqItem_Intermediaries) {
        let intermediary_Object = reqItem_Intermediaries[key];
        let intermediary_ID = intermediary_Object["id"];
        let intermediary_IRPC = intermediary_Object["amount"]; // intermediary items required per reqItem craft
        let intermediary_IRPTU = intermediary_IRPC * reqItem_CRPTU; // intermediary items required per time unit

        tryAddRequiredItem(intermediary_ID, demandOutput);
        demandOutput[intermediary_ID]["IRPTU"] += intermediary_IRPTU;

        tryAddIntermediaryItem(reqItem_ID, intermediary_ID, demandOutput)
        demandOutput[intermediary_ID]["dependencyItems"][reqItem_ID] += intermediary_IRPTU;

        calculateIntermediaryDemand(intermediary_ID, intermediary_IRPTU, demandOutput);
    }
}

function updateProductionChainDemand(prodChain, demandInfo){

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

function tryAddRequiredItem(itemID, demandOutput) 
{
  if(!(demandOutput.hasOwnProperty(itemID))){
    let itemData = {
      IRPTU: 0,
      dependencyItems: {}
    };
    demandOutput[itemID] = itemData;
  }
}

function tryAddIntermediaryItem(requiredItemID, intermediaryItemID, demandOutput) 
{
    if(!(demandOutput[intermediaryItemID]["dependencyItems"].hasOwnProperty(requiredItemID))){
        demandOutput[intermediaryItemID]["dependencyItems"][requiredItemID] = 0;
    }
}

export {
    calculateIntermediaryDemand,
    updateProductionChainDemand
}