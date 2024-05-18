/**
 * Utility module for handling various operations used by the program.
 * 
 * @module utility
 * @author Benton Diebold (CEOFYEAST)
 */

var fs = require('fs');

/**
 * Reads and returns the recipes from the JSON file.
 *
 * @returns {object} The dictionary containing all the recipes.
 */
function getRecipes() {
    return JSON.parse(fs.readFileSync('com.CEOFYEAST.FactorioProductionCalculator\\NodeServ\\Data\\recipes.json', 'utf8'));
}

/**
 * Writes the given object to a hardcoded "test data" JSON file.
 *
 * @param {object} toWrite - The object to write to the file.
 */
function writeObj(toWrite) {
    fs.writeFile('com.CEOFYEAST.FactorioProductionCalculator\\NodeServ\\Data\\test-data.json', JSON.stringify(toWrite, null, 4), function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}

module.exports = {
    getRecipes,
    writeObj
};

