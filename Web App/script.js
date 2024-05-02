/**
 * Factorio Production 
 * Author: Benton Diebold (CEOFYEAST)
 * Current Problems:
 * - CR is un-accounted for
 * - Crafting divisor is just set to one because it's currently impossible to tell which crafter a given recipe is using
 * - the UI is completely un-implemented
 * - output can get screwed up if errors occur in the middle of a calculation
 * - URPS values will still be added to the dictionary even if the CR calculations are messed up
 * Added:
 * - (3) encapsulated output printing to its own method
 * - (2) updated calculateProduction to return an updated copy of the provided input dictionary if successful, otherwise returns null
 * - (1) updated calculateProduction to accept negative URPS; this represents a removal of input URPS from the given parent 
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

    let output = {};
    let temp = calculateProduction("rocket-silo", 200, recipes, output);
    if (temp != null) {
      output = temp;
    }
    console.log(output);
    printOutput(output);
    temp = calculateProduction("rocket-silo", -190, recipes, output);
    if (temp != null) {
      output = temp;
    }
    console.log(output);
    printOutput(output);
  });
}

/**
 * Calculates the required production stats of all the ingredients required to craft the given recipe at the given units per second.
 *
 * @param {string} parentID - The ID of the parent recipe.
 * @param {number} parentURPS - The Units Required Per Second (URPS) of the parent recipe, has range (URPS < 0 || URPS > 0)
 * @param {dictionary} recipes - The dictionary containing all recipes.
 * @param {dictionary} output - The output dictionary to store the newly calculated required values for each child ingredient.
 * @returns {dictionary} Returns an updated copy of the given dictionary if the calculations were successful, otherwise returns null.
 */
function calculateProduction(parentID, parentURPS, recipes, output) {
  try {
    validateID(parentID, recipes);
    validateURPS(parentURPS);
    validateOutput(output);
  } catch (error) {
    console.log("Initial parent input invalid: " + error);
    return null;
  }

  // used to prevent corruption of output so that output can be maintained and continously added to
  // courtesy of https://stackoverflow.com/questions/43963518/to-copy-the-values-from-one-dictionary-to-other-dictionary-in-javascript
  var outputCopy = { ...output };

  try {
    addURPSToOutput(parentID, parentURPS, recipes, outputCopy);
  } catch (error) {
    console.log("Error during URPS calculations: " + error);
    return null;
  }

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
  validateURPS(parentURPS);
  validateOutput(output);

  let funcName = arguments.callee.name;

  // handles case where attempting to remove URPS
  if (parentURPS < 0) {
    if (output.hasOwnProperty(parentID)) {
      parent = output[parentID];
      existingParentURPS = parent["Input URPS"];

      // attempting to remove more URPS than the parent output has
      if (parentURPS < (existingParentURPS * -1)) {
        throw new "Cannot remove more input URPS than the parent already has, so must be greater than or equal to " + (existingParentURPS * -1) + " @ " + funcName;
      }
    }
    // attempting to remove URPS from non-existant parent output
    else {
      throw new "Cannot remove URPS from parent output that doesn't already exist @ " + funcName;
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
 * Capable of validating a given id using a given set of recipes; also handles validating the recipes in the process.
 * 
 * @param {string} id - The ID of the recipe to validate.
 * @param {dictionary} recipes - The recipes used to validate the ID.
 * @throws {string} Throws error if any input value is null, the ID is empty, or the recipe corresponding to given id does not exist.
 */
function validateID(id, recipes) {
  let callerName = arguments.callee.caller.name;

  try {
    validateRecipes(recipes);
  } catch (error) {
    throw "(" + error + ") -> Recipe Error @ " + callerName;
  }


  if (id == null) {
    throw "ID cannot be null @ " + callerName;
  }
  if (id == "") {
    throw "id cannot be empty @ " + callerName;
  }
  if (!recipes.hasOwnProperty(id)) {
    throw "Recipe with id '" + id + "' not found in recipesDict @ " + callerName;
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
    throw "Recipes cannot be null @ " + callerName;
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
    throw "URPS cannot be null @ " + callerName;
  }
  if (urps == 0) {
    throw "URPS cannot be 0 @ " + callerName;
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
    throw "Output cannot be null @ " + callerName;
  }
}