/**
 * Factorio Production 
 * Author: Benton Diebold (CEOFYEAST)
 * Current Problems:
 * - CR is un-accounted for
 * - Crafting divisor is just set to one because it's currently impossible to tell which crafter a given recipe is using
 * - the UI is completely un-implemented
 * - data validation / error handling is garbo
 *
 * Added:
 * - added explicit differentiation between URPS resulting from input vs URPS resulting from output.
 * - accounted for parent of production tree in calculateProduction method.
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

    calculateProduction("tank", 60, recipes, output);

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
  validateInput(parentID, parentURPS, recipes, output);

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
  validateInput(parentID, parentURPS, recipes, output);

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
  if (toAddID == null || recipes == null || output == null) {
    throw "No input values can be null";
  }
  if (toAddID == "") {
    throw "id cannot be empty";
  }
  if (!recipes.hasOwnProperty(toAddID)) {
    throw "Recipe with id '" + id + "' not found in recipesDict...1";
  }

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