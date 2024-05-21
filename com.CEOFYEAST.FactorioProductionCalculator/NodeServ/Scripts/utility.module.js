/**
 * Utility module for handling various operations used by the program.
 * 
 * @module utility
 * @author Benton Diebold (CEOFYEAST)
 */

var fs = require('fs');

const recipesLoc = "com.CEOFYEAST.FactorioProductionCalculator\\NodeServ\\Data\\recipes.json";
const testDataLoc = "com.CEOFYEAST.FactorioProductionCalculator\\NodeServ\\Data\\test-data.json";

/**
 * Reads and returns the JSON located within the file at the given location.
 *
 * @param {string} jsonLoc The location of the JSON file to read.
 * @returns {object} The read JSON object.
 */
function getJSON(jsonLoc) {
    return JSON.parse(fs.readFileSync(jsonLoc, 'utf8'));
}

/**
 * Writes the given object to a hardcoded "test data" JSON file.
 *
 * @param {object} toWrite - The object to write to the file.
 */
function writeObj(toWrite) {
}

module.exports = {
    getJSON,
    writeObj,
    recipesLoc,
    testDataLoc
};

