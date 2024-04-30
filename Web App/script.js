/**
 * Factorio Production 
 * Author: Benton Diebold (CEOFYEAST)
 * Current Problems:
 * - CR is un-accounted for
 * - Crafting divisor is just set to one because it's currently impossible to tell which crafter a given recipe is using
 * - the UI is completely un-implemented
 * - if recipe is validated within id validation method, the calling method will be unknown
 *
 * Added:
 * - more robust data validation system; still a few kinks to work out though
 */

//- Using a function pointer:
document.getElementById("button").onclick = getRecipes();

function getRecipes() {
  $.getJSON("https://kevinta893.github.io/factorio-recipes-json/recipes.dictionary.min.json", function(json, err) {
    if (err != "success") {
      console.log("Error cannot load json\n" + err);
      return;
    }

    var recipes = json;

    output = {};

    calculateProduction("rocket-silo", 1, recipes, output);

    // runs for every ingredient
    for (let outputKey in output) {
      outputVal = output[outputKey];
      outputURPS = outputVal["Output URPS"];

      console.log(outputKey + " : " + outputURPS);
    }
  });
}

/**
 * Calculates the required production rate per second (URPS) of all the ingredients required to craft a given recipe as well as the crafter counts required per ingredient.
 *
 * @param {string} parentID - The ID of the parent recipe.
 * @param {number} parentURPS - The Units Required Per Second (URPS) of the parent recipe.
 * @param {object} recipes - The dictionary containing all recipes.
 * @param {object} output - The output dictionary to store calculated URPS for each child ingredient.
 */
function calculateProduction(parentID, parentURPS, recipes, output) {
  validateID(parentID, recipes);
  validateURPS(parentURPS);
  validateOutput(output);

  tryAddToOutput(parentID, recipes, output);

  parent = output[parentID];

  parent["Input URPS"] += parentURPS;

  calculateChildrenURPS(parentID, parentURPS, recipes, output);
}

/**
 * Recursively calculates the Units Required Per Second (URPS) of all the ingredients required to produce the given URPS of the given parent.
 * 
 * @param {string} parentID - The ID of the parent recipe.
 * @param {number} parentURPS - The Units Required Per Second (URPS) of the parent recipe.
 * @param {object} recipes - The dictionary containing all recipes.
 * @param {object} output - The output dictionary to store calculated URPS for each child ingredient.
 * @returns {void} This function does not return a value explicitly, but updates the output dictionary with calculated URPS.
 */
function calculateChildrenURPS(parentID, parentURPS, recipes, output) {
  validateID(parentID, recipes);
  validateURPS(parentURPS);
  validateOutput(output);

  let parent = recipes[parentID];
  let parentType = parent["Type"];

  // base case
  if (parentType == "Resource" || parentType == "Liquid") {
    return;
  }

  let parentRecipe = parent["recipe"];
  let parentUPPC = parentRecipe["yield"];
  let parentCRPS = parentURPS / parentUPPC;
  let parentIngredients = parentRecipe["ingredients"];

  // runs for every ingredient
  for (let ingredientKey in parentIngredients) {
    let ingredientDict = parentIngredients[ingredientKey];
    let childID = ingredientDict["id"];

    tryAddToOutput(childID, recipes, output);

    let childURPC = ingredientDict["amount"];
    let childURPS = childURPC * parentCRPS;
    let childOutput = output[childID];

    childOutput["Output URPS"] += childURPS;

    calculateChildrenURPS(childID, childURPS, recipes, output);
  }
}

function calculateCR() {

}

/**
 * Tries to add the item/resource associated with the given ID to the output dictionary.
 * 
 * @param {number} toAddID - The ID of the item/resource being added; this is the only information necessary to add the item.
 * @param {dictionary} recipes - The dictionary containing all recipes.
 * @param {dictionary} output - The dictionary to add the fresh item/resource representation to.
 * @returns {boolean} Whether the addition was succesful.
 */
function tryAddToOutput(toAddID, recipes, output) {
  validateID(toAddID, recipes);
  validateOutput(output);

  // adds ingredient representation to output if it doesn't already exist.
  if (!output.hasOwnProperty(toAddID)) {
    let outputVals = {
      "Input URPS": 0,
      "Output URPS": 0,
      "CR": 0
    };

    let toAddType = recipes[toAddID]["Type"];
    if (toAddType == "Resource" || toAddType == "Liquid") {
      delete outputVals["CR"];
    }

    output[toAddID] = outputVals;

    return true;
  }

  return false;
}

/**
 * Capable of validating two commonly used input signature within the program.
 * 
 * @param {string} id - The ID of the recipe.
 * @param {number} urps - The Units Required Per Second (URPS) for the recipe.
 * @param {object} recipes - The dictionary containing all recipes.
 * @param {object} output - The output dictionary.
 * @throws {string} Throws error if any input value is null, URPS is less than or equal to 0, ID is empty, or            * recipe corresponding to given id does not exist.
 */
function validateInput(id, urps, recipes, output) {
  if (id == null || recipes == null || output == null || urps == null) {
    throw "No input values can be null";
  }
  if (urps <= 0) {
    throw "URPS must be greater than 0.";
  }
  if (id == "") {
    throw "id cannot be empty";
  }
  if (!recipes.hasOwnProperty(id)) {
    throw "Recipe with id '" + id + "' not found in recipesDict...2";
  }
}

/**
 * Capable of validating a given id using a given set of recipes; also handles validating the recipes in the process.
 * 
 * @param {string} id - The ID of the recipe to validate.
 * @param {dictionary} recipes - The recipes used to validate the ID.
 * @throws {string} Throws error if any input value is null, the ID is empty, or the recipe corresponding to given id does not exist.
 */
function validateID(id, recipes) {
  let callerName = arguments.callee.caller.name;

  validateRecipes(recipes);

  if (id == null) {
    throw "ID cannot be null, @ " + callerName;
  }
  if (id == "") {
    throw "id cannot be empty, @ " + callerName;
  }
  if (!recipes.hasOwnProperty(id)) {
    throw "Recipe with id '" + id + "' not found in recipesDict, @ " + callerName;
  }
}

/**
 * Capable of validating a given set of recipes.
 *
 * @param {dictionary} recipes - The recipes to validate.
 * @throws {string} Throws error if the given dictionary is null.
 */
function validateRecipes(recipes) {
  let callerName = arguments.callee.caller.name;

  if (recipes == null) {
    throw "Recipes cannot be null, @ " + callerName;
  }
}

/**
 * Capable of validating a URPS value.
 *
 * @param {decimal} urps - The URPS to validate.
 * @throws {string} Throws error if the given URPS is null, or less than or equal to 0.
 */
function validateURPS(urps) {
  let callerName = arguments.callee.caller.name;

  if (urps == null) {
    throw "URPS cannot be null, @ " + callerName;
  }
  if (urps <= 0) {
    throw "URPS must be greater than 0, @ " + callerName;
  }
}

/**
 * Capable of validating a set of output.
 *
 * @param {dictionary} output - The output to validate.
 * @throws {string} Throws error if the given output is null.
 */
function validateOutput(output) {
  let callerName = arguments.callee.caller.name;

  if (output == null) {
    throw "Output cannot be null, @ " + callerName;
  }
}