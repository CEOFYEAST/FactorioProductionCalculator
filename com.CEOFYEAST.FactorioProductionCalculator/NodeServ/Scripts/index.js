const { getRecipes, calculateChildrenURPS } = require('./calculators.module.js');
const { writeObj } = require('./data-write.module.js');

var recipes = getRecipes();
console.log("Recipes type: " + typeof recipes)
var output = {};
calculateChildrenURPS('inserter', 5, {}, output);
writeObj(output);