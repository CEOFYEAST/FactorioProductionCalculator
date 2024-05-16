/**
 * Factorio Production 
 * Author: Benton Diebold (CEOFYEAST)
 * Current Problems:
 * - CR is un-accounted for
 * - Crafting divisor is just set to one because it's currently impossible to tell which crafter a given recipe is using
 * - the UI is completely un-implemented
 * - there is some weird interplay between addURPSToOutput and calculateChildrenURPS where they both update the output
 * - its not explicitly mentioned that calculateProduction returns a copy of the output that then must be assigned to the output if not null (null suggests an error occurred during calculations)
 * - I've tried my best to ensure correctness of the program, or atleast prevent bad updates to the output, by using invariants,conditions,etc. but the correctness of the program isn't verfied, and there aren't any tests.
 
 * Added:
 * - (1) updated calculateProduction to accept negative URPS; this represents a removal of input URPS from the given parent
 * - (2) added preliminary method (addURPSToOutput) before calculating URPS to ensure that no bad additions/subtractions occur
 * - (3) updated calculateProduction to return an updated copy of the provided input dictionary if successful, otherwise returns null
 * - (4) calculateProduction is now solely responsible for maintaining/updating/returning copy of output as well reporting errors in the program when they arise
 * - (5) encapsulated output printing to its own method
 */

const fs = require('fs');

function getRecipes() {
  return JSON.parse(fs.readFileSync('com.CEOFYEAST.FactorioProductionCalculator\\NodeServ\\Data\\recipes.json', 'utf8'));
}

/**
 * Calculates the required production stats of all the ingredients required to craft the given recipe at the given units per second.
 *
 * @param {string} parentID - The ID of the parent recipe.
 * @param {number} inputURPS - The Units Required Per Second (URPS) of the parent recipe, has range (URPS < 0 || URPS > 0)
 * @param {dictionary} recipes - The dictionary containing all recipes.
 * @param {dictionary} output - The output dictionary whose copy will store the newly calculated required values for each child ingredient.
 * @returns {dictionary} Returns an updated copy of the given dictionary containing the calculations if they were successful, otherwise returns null.
 */
function UpdateProduction(parentID, inputURPS, isSubtractingURPS, recipes, output) {
  validateID(parentID, recipes);
  validateNumber(inputURPS);
  validateBool(isSubtractingURPS);
  validateOutput(output);
  if(inputURPS <= 0)
  {
    let err = Error("Input URPS must be greater than zero\n");
    throw err.stack;
  }

  // used to prevent corruption of output so that output can be maintained and continously added to
  // courtesy of https://stackoverflow.com/questions/43963518/to-copy-the-values-from-one-dictionary-to-other-dictionary-in-javascript
  var outputCopy = { ...output };

  addURPSToOutput(parentID, parentURPS, recipes, outputCopy);

  return outputCopy;
}

/**
 * Adds the required URPS of the given parent recipe to the output, as well as the URPS of all the ingredients required to meet said URPS (can "add" a negative URPS in order to remove existing URPS).
 *
 * @param {string} parentID - The ID of the parent recipe.
 * @param {number} parentURPS - The Units Required Per Second (URPS) of the parent recipe.
 * @param {object} recipes - The dictionary containing all recipes.
 * @param {object} output - The output dictionary to store calculated URPS for each child ingredient.
 * @returns {void} This function does not return a value explicitly, but updates the output dictionary with calculated URPS.
 * @throws {string} Throws an error if attempting to remove URPS from parent output that doesn't already exist, or if attempting to remove too much URPS from pre-existing parent output. 
 */
function addURPSToOutput(parentID, parentURPS, recipes, output) {
  validateID(parentID, recipes);
  validateNumber(inputURPS);
  validateOutput(output);
  if(inputURPS <= 0)
  {
    let err = Error("Input URPS must be greater than zero\n");
    throw err.stack;
  }

  // handles case where attempting to remove URPS
  if (parentURPS < 0) {
    if (output.hasOwnProperty(parentID)) {
      parent = output[parentID];
      existingParentURPS = parent["Input URPS"];

      // attempting to remove more URPS than the parent output has
      if (parentURPS < (existingParentURPS * -1)) {
        let err = Error("Cannot remove more input URPS than the parent already has, so must be greater than or equal to " + (existingParentURPS * -1) + "\n");
        throw err.stack;
      }
    }
    // attempting to remove URPS from non-existant parent output
    else {
      let err = Error("Cannot remove URPS from parent output that doesn't already exist\n");
      throw err.stack;
    }
  }
  // handles case where attempting to add URPS
  else {
    // code block accounts for parent production stats in output
    tryAddToOutput(parentID, recipes, output);
  }

  parent = output[parentID];
  parent["Input URPS"] += parentURPS;

  calculateChildrenURPS(parentID, parentURPS, recipes, output);
}

/**
 * Recursively calculates the Units Required Per Second (URPS) of all the ingredients required to produce the given URPS of the given parent.
 * 
 * @param {string} parentID - The ID of the parent recipe.
 * @param {number} inputURPS - The Units Required Per Second (URPS) of the parent recipe.
 * @param {object} recipes - The dictionary containing all recipes.
 * @param {object} output - The output dictionary to store calculated URPS for each child ingredient.
 * @returns {void} This function does not return a value explicitly, but updates the output dictionary with calculated URPS.
 */
function calculateChildrenURPS(parentID, inputURPS, recipes, output) {
  validateID(parentID, recipes);
  validateNumber(inputURPS);
  validateOutput(output);
  if(inputURPS == 0)
    {
      let err = Error("Input URPS caanot be zero\n");
      throw err.stack;
    }

  let parent = recipes[parentID];
  let parentType = parent["Type"];

  // base case
  if (parentType == "Resource" || parentType == "Liquid") {
    return;
  }

  let parentRecipe = parent["recipe"];
  let parentUPPC = parentRecipe["yield"];
  let parentCRPS = inputURPS / parentUPPC;
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


function printOutput(output) {
  console.log("print begun");

  // runs for every ingredient
  for (let outputKey in output) {
    outputVal = output[outputKey];
    outputURPS = outputVal["Output URPS"];

    console.log(outputKey + " : " + outputURPS);
  }

  console.log("print finished");
}

/**
 * Throws an error if the given value is nullish.
 * 
 * @param {*} val The value to check for nullishness.
 * @throws {string} if the given val is nullish; a unique error is thrown depending on if the value if undefined or null.
 */
function ensureNonNullish(val, func)
{
  if(val === undefined)
  {
    let err = Error("Value is undefined\n");
    throw err.stack;
  }
  else if(val === null)
  {
    let err = Error("Value is null\n");
    throw err.stack;
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
  ensureNonNullish(id);

  if (!(typeof id === 'string')) {
    let err = Error("ID must be of type string\n");
    throw err.stack;
  }

  validateRecipes(recipes);

  if (id == "") {
    let err = Error("id cannot be empty\n");
    throw err.stack;
  }
  if (!recipes.hasOwnProperty(id)) {
    let err = Error("Recipe with id '" + id + "' not found in recipesDict\n");
    throw err.stack;
  }
}

/**
 * Capable of validating a given set of recipes.
 *
 * @param {dictionary} recipes - The recipes to validate.
 * @throws {string} Throws error if the given dictionary is null.
 */
function validateRecipes(recipes) {
  ensureNonNullish(recipes);

  if(!(typeof recipes === 'object')){
    let err = Error("Recipes is not of type Object\n");
    throw err.stack;
  }

  if(!(recipes)){
    let err = Error("Recipes is empty\n");
    throw err.stack;
  }
}

/**
 * Capable of validating a set of output.
 *
 * @param {dictionary} output - The output to validate.
 * @throws {string} Throws error if the given output is null.
 */
function validateOutput(output) {
  ensureNonNullish(output);

  if(!(typeof output === 'object')){
    let err = Error("Output is not of type Object\n");
    throw err.stack;
  }
}

/**
 * Ensures the given value is a boolean.
 * 
 * @param {boolean} val The value to validate.
 */
function validateBool(val) {
  ensureNonNullish(val);

  if(!(typeof value === 'boolean')) {
    let err = Error("Value is not of type boolean\n");
    throw err.stack;
  }
}

/**
 * Ensures the given value is a number.
 * 
 * @param {boolean} val The value value to validate.
 */
function validateNumber(val) {
  ensureNonNullish(val);

  if(!(typeof val === 'number' && !isNaN(val))) {
    let err = Error("Value is not a number\n");
    throw err.stack;
  }
}

module.exports = {
  getRecipes,
  calculateChildrenURPS
};
