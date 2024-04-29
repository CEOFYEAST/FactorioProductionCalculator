/**
 * Current Problems:
 * - CR is un-accounted for
 * - Crafting divisor is just set to one because it's currently impossible to tell which crafter a given recipe is using
 * - the original paren aka. original input is un-accounted for in the output
 * - the UI is completely un-implemented
 * - input and output URPS aren't differentiated between
 */
function getRecipes() {
  $.getJSON("https://kevinta893.github.io/factorio-recipes-json/recipes.dictionary.min.json", function(json, err) {
    if (err != "success") {
      console.log("Error cannot load json\n" + err);
      return;
    }

    return json;
  });
}

function calculateProduction() {
  let output = {};



  calculateChildrenURPS("inserter", 3, recipesDict, output)

  // runs for every ingredient
  for (let outputKey in output) {
    outputVal = output[outputKey];
    outputURPS = outputVal["URPS"];

    console.log(outputKey + " : " + outputURPS);
  }
}

//- Using a function pointer:
document.getElementById("button").onclick = getRecipes();

/**
 * Recursively calculates the Units Required Per Second (URPS) of all the ingredients required to produce the given URPS of the given parent.
 * 
 * @param {string} parentID - The ID of the parent recipe.
 * @param {number} parentURPS - The Units Required Per Second (URPS) of the parent recipe.
 * @param {object} recipes - The dictionary containing all recipes.
 * @param {object} output - The output dictionary to store calculated URPS for each child ingredient.
 * @throws {string} Throws an error if any input values are null, if parent URPS is invalid, if parentID is an empty string, or if recipe is not found in recipes.
 * @returns {void} This function does not return a value explicitly, but updates the output dictionary with calculated URPS.
 */
function calculateChildrenURPS(parentID, parentURPS, recipes, output) {
  if (parentID == null || parentURPS == null || recipes == null || output == null) {
    throw "No input values can be null";
  }
  if (parentURPS <= 0) {
    throw "URPS must be greater than 0";
  }
  if (parentID == "") {
    throw "id cannot be empty";
  }
  if (!recipes.hasOwnProperty(parentID)) {
    throw "Recipe with id '" + id + "' not found in recipesDict";
  } ``

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
    let child = recipes[childID];
    let childType = child["Type"];
    let childURPC = ingredientDict["amount"];
    let childURPS = childURPC * parentCRPS;



    let childOutput = output[childID];

    childOutput["URPS"] += childURPS;

    calculateChildrenURPS(childID, childURPS, recipes, output);
  }
}

function calculateCR() {

}

/**
 * Tries to add the item/resource associated with the given ID to the output dictionary.
 * @param {dictionary} output - The dictionary to add the fresh item/resource representation to.
 * @param {number} toAddID - The ID of the item/resource being added; this is the only information necessary to add the item.
 * @returns {boolean} Whether the operation was succesful.
 */
function tryAddToOutput(output, toAddID) {
  if (output == null || toAddID == null) {
    throw "No input values can be null";
  }
  if (toAddID == "") {
    throw "id cannot be empty";
  }

  // adds ingredient representation to output if it doesn't already exist.
  if (!output.hasOwnProperty(childID)) {
    let childOutputVals = {
      "Input URPS": 0,
      "URPS": 0,
      "CR": 0
    };

    if (childType == "Resource" || childType == "Liquid") {
      childOutputVals = {
        "Input URPS": 0,
        "URPS": 0
      };
    }

    output[childID] = childOutputVals;

    return true;
  }

  return false;
}