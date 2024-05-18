/**
 * This module provides functions for updating/maintaining the program's output. It does this by making use of functions from the calculators module.
 * 
 * @module FactorioProductionCalculator
 * @author Benton Diebold (CEOFYEAST)
 */

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

  updateProductionURPS(inputID, inputURPS, isSubtractingURPS, recipes, outputCopy);

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
  
    let calculations = {};
    calculateChildrenURPS(inputID, inputURPS, calculations, recipes);
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

module.exports = {
    updateProduction,
    updateProductionURPS,
    tryAddToOutput,
    printOutput,
};