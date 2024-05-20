/**
 * Acts as the entrypoint for the node server.
 * 
 * @module index
 * @author Benton Diebold (CEOFYEAST)
 */

const { calculateChildrenURPS } = require('./calculators.module.js');
const { getJSON, writeObj, recipesLoc, testDataLoc } = require('./utility.module.js');
const { updateProduction, updateProductionURPS, tryAddToOutput, printOutput } = require('./output.module.js');

var recipes = getJSON(recipesLoc);

//let output = getJSON(testDataLoc);
let output = {};
updateProductionURPS('inserter', 5, false, recipes, output);
writeObj(output);

/**
let calculations = {};
calculateChildrenURPS('inserter', 5, calculations, recipes);
writeObj(calculations);
*/

