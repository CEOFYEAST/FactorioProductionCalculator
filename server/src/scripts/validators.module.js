/**
 * @module validators
 * @description This module provides functions for validating various types of values, such as IDs, recipes, output, booleans, and numbers.
 */

import {recipes, validIDs} from "./recipes.module"
 
function ensureNonNullish(val)
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

function validateID(id) {
    ensureNonNullish(id);

    if (!(typeof id === 'string')) {
        let err = Error("ID must be of type string, is of type " + typeof id + "\n");
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

function validateRecipes(recipes) {
    ensureNonNullish(recipes);
    validateObject(recipes);
}

function validateProdChainObject(prodChainObject) {
    ensureNonNullish(prodChainObject);
    validateObject(prodChainObject);
    if (!(prodChainObject.hasOwnProperty("prodChain")) || !(prodChainObject.hasOwnProperty("timeUnit"))) {
        let err = Error("Supplied production chain is invalid");
        throw err.stack;
    }

}

function validateObject(val){
    ensureNonNullish(val);

    if(!(typeof val === 'object')){
        let err = Error(typeof val + " is not of type object\n");
        throw err.stack;
    }
}

function validateBool(val) {
    ensureNonNullish(val);

    if(!(typeof val === 'boolean')) {
        let err = Error(typeof val + " is not of type boolean\n");
        throw err.stack;
    }
}

function validateNumber(val) {
    ensureNonNullish(val);

    if(!(typeof val === 'number' && !isNaN(val))) {
        let err = Error(typeof val + " is not a number\n");
        throw err.stack;
    }
}

export {
    ensureNonNullish,
    validateID,
    validateRecipes,
    validateProdChainObject,
    validateObject,
    validateBool,
    validateNumber
};