const { getRecipes, calculateChildrenURPS } = require('./calculators.module.js');
const { writeObj } = require('./data-write.module.js');

var recipes = getRecipes();
var calculations = {};
calculateChildrenURPS('inserter', 5, calculations, recipes);
writeObj(calculations);