/**
 * Acts as the entrypoint for the node server.
 * 
 * @module index
 * @author Benton Diebold (CEOFYEAST)
 */

const { calculateChildrenURPS } = require('./calculators.module.js');
const { getRecipes, writeObj } = require('./utility.module.js');

var recipes = getRecipes();

var calculations = {};
calculateChildrenURPS('satellite', 5, calculations, recipes);
writeObj(calculations);

