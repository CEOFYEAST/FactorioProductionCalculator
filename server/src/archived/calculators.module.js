/**
 * Contains functions that do all the calculations required to produce the program's output.
 * 
 * @module calculators
 * @author Benton Diebold (CEOFYEAST)
 */

const fs = require('fs');
const { validateID, validateNumber, validateBool, validateOutput, validateObject } = require('../scripts/validators.module.js');

/**
 * Recursively calculates the Units Required Per Second (URPS) of all the ingredients required to produce the given URPS of the given parent; 
 * also maintains the portions of the child URPS that come from each parent.
 * 
 * @param {string} parentID The ID of the parent recipe.
 * @param {number} parentURPS The Units Required Per Second (URPS) of the parent recipe.
 * @param {object} calculations Stores the calculations as a set of key-value pairs, with keys being item IDs and vals being their associated URPS.
 * @param {object} recipes The dictionary containing all recipes.
 * @returns {void} The calculations object stores the output of the function.
 */
function calculateChildrenURPS(parentID, parentURPS, calculations, recipes) 
{
  validateID(parentID, recipes);
  validateNumber(parentURPS);
  validateObject(calculations);
  if(parentURPS == 0) {
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
  let parentCRPS = parentURPS / parentUPPC;
  let parentIngredients = parentRecipe["ingredients"];

  // runs for every child ingredient
  for (let ingredientKey in parentIngredients) {
    let childIngredientDict = parentIngredients[ingredientKey];
    let childID = childIngredientDict["id"];
    let childURPC = childIngredientDict["amount"];
    let childURPS = childURPC * parentCRPS;

    // maintains total URPS of child ingredient
    tryAddChildToCalculations(childID, calculations);
    calculations[childID]["URPS"] += childURPS;

    // maintains parent-child relationships, including portions of child URPS that come from each parent
    tryAddParentItemToChild(childID, parentID, calculations);
    calculations[childID]["Parent Items"][parentID]["CURPS"] += childURPS;

    calculateChildrenURPS(childID, childURPS, calculations, recipes);
  }

  /**
   * Attempts to add the given child ingredient to the calculations object.
   * 
   * @param {string} childID The ID of the child ingredient.
   * @param {object} calculations The set of calculations to be updated.
   */
  function tryAddChildToCalculations(childID, calculations) 
  {
    if(!(calculations.hasOwnProperty(childID))){
      let childOutline = {
        "URPS": 0,
        "Parent Items": {}
      };
      calculations[childID] = childOutline;
    }
  }

  /**
   * Attempts to add the given parent item to the list of parent items that require the child ingredient. 
   * This information is used to maintain the parent-child relationships inherent in the recipe tree.
   * 
   * @param {string} childID The ID of the child ingredient.
   * @param {string} parentID The ID of the parent item.
   * @param {object} calculations The set of calculations to be updated.
   */
  function tryAddParentItemToChild(childID, parentID, calculations)
  {
    if(!(calculations[childID]["Parent Items"].hasOwnProperty(parentID))){
      let childOutline = {
        "CURPS": 0
      };
      calculations[childID]["Parent Items"][parentID] = childOutline;
    }
  }
}

/**
 * Finds the most complicated recipe from the provided recipes object.
 *
 * @param {Object} recipes - The object containing the recipes.
 * @returns {string} - The ID of the most complicated recipe.
 * @throws {Error} - If no recipes are provided or if no complicated recipe is found.
 */
function mostComplicatedRecipe(recipes) {
  /**
   * Determines the count of ingredients required for a given recipe ID.
   *
   * @param {string} id - The ID of the recipe.
   * @returns {number} The count of ingredients required.
   */
  function determineIngredientsCount(id) {
      let recipe = recipes[id];
      let recipeInfo = recipe["recipe"];
      let ingredients = recipeInfo["ingredients"];
      return ingredients.length;
  }

  if (!recipes || Object.keys(recipes).length === 0) {
      throw new Error("No recipes provided");
  }

  let max = null;
  let maxIngredientsCount = 0;

  Object.keys(recipes).forEach((key) => {
      let recipe = recipes[key];
      let recipeType = recipe["Type"];

      if (recipeType !== "Resource" && recipeType !== "Liquid") {
          let currentIngredientsCount = determineIngredientsCount(key);

          if (currentIngredientsCount > maxIngredientsCount) {
              maxIngredientsCount = currentIngredientsCount;
              max = key;
          }
      }
  });

  if (max === null) {
      throw new Error("No complicated recipe found");
  }

  return max;
}

module.exports = {
  calculateChildrenURPS
};