/**
 * This module provides functions for updating/maintaining the program's output. It does this by making use of functions from the calculators module.
 * 
 * @module FactorioProductionCalculator
 * @author Benton Diebold (CEOFYEAST)
 */

const { calculateChildrenURPS } = require('./calculators.module.js');
const { validateID, validateNumber, validateBool, validateOutput, validateObject } = require('./validators.module.js');

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
// function updateProduction(inputID, inputURPS, isSubtractingURPS, recipes, output) {
//   validateID(inputID, recipes);
//   validateNumber(inputURPS);
//   validateBool(isSubtractingURPS);
//   validateOutput(output);
//   if(inputURPS <= 0)
//   {
//     let err = Error("Input URPS must be greater than zero\n");
//     throw err.stack;
//   }

//   // used to prevent corruption of output so that output can be maintained and continously added to
//   // courtesy of https://stackoverflow.com/questions/43963518/to-copy-the-values-from-one-dictionary-to-other-dictionary-in-javascript
//   var outputCopy = { ...output };

//   updateProductionURPS(inputID, inputURPS, isSubtractingURPS, recipes, outputCopy);

//   return outputCopy;
// }

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
  validateURPSSubtraction(inputID, inputURPS, isSubtractingURPS, recipes, output);

  // ensures the newly calculated URPS vals are removed from the existing output vals.
  if(isSubtractingURPS){inputURPS *= -1;}
  
  // code block updates URPS of input item in output
  tryAddToOutput(inputID, recipes, output);
  output[inputID]["Input URPS"] += inputURPS;

  // removes input item from output if it's no longer required in any capacity
  // useful post-subtraction
  if(output[inputID]["Input URPS"] == 0 && output[inputID]["Output URPS"] == 0) {
    delete output[inputID];
  }

  // code block updates output with calculations from calculateChildrenURPS
  let calculations = {};
  calculateChildrenURPS(inputID, inputURPS, calculations, recipes);
  for (let key in calculations) {
    tryAddToOutput(key, recipes, output);

    // updates URPS in output of each item updated via calculations
    output[key]["Output URPS"] += calculations[key]["URPS"];

    if(output[key]["Output URPS"] == 0) {
      delete output[key];
    } else {
        // same as above, but instead updates portions of URPS that come from each parent 
      for (let parentKey in calculations[key]["Parent Items"]) {
        // ensures parent item is added to output if it doesn't already exist
        if(!(output[key]["Parent Items"].hasOwnProperty(parentKey))) {
          output[key]["Parent Items"][parentKey] = { ...calculations[key]["Parent Items"][parentKey] };
        }
        else {
          output[key]["Parent Items"][parentKey]["CURPS"] += calculations[key]["Parent Items"][parentKey]["CURPS"];
        }
      }
    }
  }

  /**
   * Function ensures that an improper removal of URPS from the output object is avoided.
   * 
   * @throws {string} If attempting to remove input URPS from item in output that doesn't already exist.
   * @throws {string} If attempting to remove an amount of URPS that would result in negative input URPS.
   */
  // function validateURPSSubtraction(inputID, inputURPS, isSubtractingURPS, recipes, output){
  //   if (isSubtractingURPS) { // handles case where attempting to remove URPS
  //     if (output.hasOwnProperty(inputID)) {
  //       inputItem = output[inputID];
  //       existingInputURPS = inputItem["Input URPS"];

  //       // attempting to remove more input URPS than the input item already has
  //       if (inputURPS > existingInputURPS) {
  //         let err = Error("Cannot remove more input URPS than the item already has, so must be less than or equal to " + existingInputURPS + "\n");
  //         throw err.stack;
  //       }
  //     }
  //     // attempting to remove URPS from input item that doesn't yet exist in output (its not already required)
  //     else {
  //       let err = Error("Cannot remove URPS from input item that doesn't already exist\n");
  //       throw err.stack;
  //     }
  //   }
  // }

  /**
   * Tries to add the item/resource associated with the given ID to the output dictionary.
   * 
   * @param {number} toAddID - The ID of the item/resource being added; this is the only information necessary to add the item.
   * @param {dictionary} recipes - The dictionary containing all recipes.
   * @param {dictionary} output - The dictionary to add the fresh item/resource representation to.
   */
  // function tryAddToOutput(toAddID, recipes, output) {
  //   validateID(toAddID, recipes);
  //   validateOutput(output);

  //   // adds ingredient representation to output if it doesn't already exist.
  //   if (!output.hasOwnProperty(toAddID)) {
  //     let outputVals = {
  //       "Input URPS": 0,
  //       "Output URPS": 0,
  //       "Parent Items": {}
  //     };
  //     output[toAddID] = outputVals;
  //   }
  // }
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
};