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
 * Updates the given output object with all the production stats required to meet the given input URPS of the given input item.
 *
 * @param {string} inputID The ID of the input recipe.
 * @param {number} inputURPS The Units Required Per Second (URPS) of the input recipe, must be greater than zero.
 * @param {boolean} isSubtractingURPS Whether the input URPS is being removed from the output.
 * @param {dictionary} recipes The dictionary containing all recipes.
 * @param {dictionary} output The output dictionary whose copy will store the newly calculated required values for every required ingredient.
 * @returns {dictionary} Returns an updated copy of the given dictionary containing the calculations if they were successful, otherwise returns null.
 */
function updateProduction(inputID, inputURPS, isSubtractingURPS, recipes, output) {
  validateID(inputID, recipes);
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

  updateProductionURPS(inputID, inputURPS, recipes, outputCopy);

  return outputCopy;
}

/**
 * Updates the given output object with the URPS stats of all the ingredients required to make the given input URPS of the given input item.
 *
 * @param {string} inputID The ID of the input recipe.
 * @param {number} inputURPS The Units Required Per Second (URPS) of the input recipe, must be greater than zero.
 * @param {boolean} isSubtractingURPS Whether the input URPS is being removed from the output.
 * @param {object} recipes - The dictionary containing all recipes.
 * @param {dictionary} output The output dictionary whose copy will store the newly calculated required values for every required ingredient.
 * @returns {void} This function does not return a value explicitly, but updates the output dictionary with calculated URPS.
 * @throws {string} Throws an error if attempting to remove URPS from parent output that doesn't already exist, or if attempting to remove too much URPS from pre-existing parent output. 
 */
function updateProductionURPS(inputID, inputURPS, isSubtractingURPS, recipes, output) {
  validateID(inputID, recipes);
  validateNumber(inputURPS);
  validateBool(isSubtractingURPS);
  validateOutput(output);
  if(inputURPS <= 0)
  {
    let err = Error("Input URPS must be greater than zero\n");
    throw err.stack;
  }

  // handles case where attempting to remove URPS
  if (isSubtractingURPS) {
    if (output.hasOwnProperty(inputID)) {
      inputItem = output[inputID];
      existingInputURPS = inputItem["Input URPS"];

      // attempting to remove more input URPS than the input item already has
      if (inputURPS > existingInputURPS) {
        let err = Error("Cannot remove more input URPS than the item already has, so must be less than or equal to " + existingInputURPS + "\n");
        throw err.stack;
      }
    }
    // attempting to remove URPS from input item that doesn't yet exist in output (its not already required)
    else {
      let err = Error("Cannot remove URPS from input item that doesn't already exist\n");
      throw err.stack;
    }
  }
  // handles case where attempting to add URPS
  else {
    // code block accounts for input item production stats in output
    tryAddToOutput(inputID, recipes, output);
  }

  if(isSubtractingURPS){ inputURPS *= -1; }
  inputItem = output[inputID];
  inputItem["Input URPS"] += inputURPS;
  calculateChildrenURPS(inputID, inputURPS, recipes);
}

/**
 * Recursively calculates the Units Required Per Second (URPS) of all the ingredients required to produce the given URPS of the given parent.
 * 
 * @param {string} inputID - The ID of the parent recipe.
 * @param {number} inputURPS - The Units Required Per Second (URPS) of the parent recipe.
 * @param {object} recipes - The dictionary containing all recipes.
 * @returns {object} Contains the URPS of all the ingredients required to produce the given input URPS of the given input item.
 */
function calculateChildrenURPS(parentID, parentURPS, recipes) {
  validateID(parentID, recipes);
  validateNumber(parentURPS);
  if(parentURPS == 0)
    {
      let err = Error("Parent URPS caanot be zero\n");
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

/**
 * Prints out the given output object.  
 * 
 * @param {object} output 
 */
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
