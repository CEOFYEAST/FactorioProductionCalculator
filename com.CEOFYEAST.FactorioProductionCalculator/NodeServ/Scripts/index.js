/**
 * Acts as the entrypoint for the node server.
 * 
 * @module index
 * @author Benton Diebold (CEOFYEAST)
 */

const { calculateChildrenURPS } = require('./calculators.module.js');
const { getJSON, writeObj, recipesLoc, testDataLoc } = require('./utility.module.js');
const { updateProduction, updateProductionURPS, tryAddToOutput, printOutput } = require('./output.module.js');
const { connect } = require('./db.module.js');
const fs = require('fs');
const fsPromises = require('fs').promises; 

connect();


