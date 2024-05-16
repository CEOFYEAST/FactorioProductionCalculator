const { getRecipes, calculateChildrenURPS } = require('./calculators.module.js');
const { writeObj } = require('./data-write.module.js');
const { mostComplicatedRecipe } = require('./fun-calculators.module.js')

var recipes = getRecipes();

var calculations = {};
calculateChildrenURPS('satellite', 5, calculations, recipes);
writeObj(calculations);

