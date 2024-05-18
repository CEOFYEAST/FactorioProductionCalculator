/**
 * @module validators
 * @description This module provides functions for validating various types of values, such as IDs, recipes, output, booleans, and numbers.
 */
 
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
    validateObject(recipes);
}

/**
 * Capable of validating a set of output.
 *
 * @param {dictionary} output - The output to validate.
 * @throws {string} Throws error if the given output is null.
 */
function validateOutput(output) {
    ensureNonNullish(output);
    validateObject(output);
}

/**
 * Ensures the given value is a boolean.
 * 
 * @param {object} val The value to validate.
 * @throws {string} If the supplied value is not an object.
 */
function validateObject(val){
    ensureNonNullish(val);

    if(!(typeof val === 'object')){
        let err = Error("Value is not of type object\n");
        throw err.stack;
    }
}

/**
 * Ensures the given value is a boolean.
 * 
 * @param {boolean} val The value to validate.
 * @throws {string} If the supplied value is not a boolean.
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
 * @param {number} val The value value to validate.
 * @throws {string} If the supplied value is not a number.
 */
function validateNumber(val) {
    ensureNonNullish(val);

    if(!(typeof val === 'number' && !isNaN(val))) {
        let err = Error("Value is not a number\n");
        throw err.stack;
    }
}

module.exports = {
    ensureNonNullish,
    validateID,
    validateRecipes,
    validateOutput,
    validateObject,
    validateBool,
    validateNumber
};