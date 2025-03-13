const recipes = require("./recipes.module")

function addIRPTU(itemID, amount, prodChainObject) {}
function subtractIRPTU(itemID, amount, prodChainObject) {}
function getUserDemand(prodChainObject) {}
function recalculateTimeUnit(prodChainObject) {}

module.exports = {
    addIRPTU, subtractIRPTU, getUserDemand, recalculateTimeUnit
}