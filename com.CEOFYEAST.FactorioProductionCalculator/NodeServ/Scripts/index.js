/**
 * Acts as the entrypoint for the node server.
 * 
 * @module index
 * @author Benton Diebold (CEOFYEAST)
 */

const { calculateChildrenURPS } = require('./calculators.module.js');
const { getJSON, writeObj, recipesLoc, testDataLoc } = require('./utility.module.js');
const { updateProduction, updateProductionURPS, tryAddToOutput, printOutput } = require('./output.module.js');
const fs = require('fs');
const fsPromises = require('fs').promises; 

var recipes = getJSON(recipesLoc);

let output = {};
updateProductionURPS('inserter', 35, false, recipes, output);
fsPromises.writeFile(testDataLoc, JSON.stringify(output, null, 4))
    .then(() => {
        console.log("File has been written successfully");
    })
    .then(() => {
        output = getJSON(testDataLoc);
        updateProductionURPS('inserter', 34, true, recipes, output);
        return fsPromises.writeFile(testDataLoc, JSON.stringify(output, null, 4))
    })
    .then(() => {
        console.log("File has been altered successfully");
        output = getJSON(testDataLoc);
        updateProductionURPS('inserter', 1, true, recipes, output);
        return fsPromises.writeFile(testDataLoc, JSON.stringify(output, null, 4))
    })
    .then(() => {
        console.log("File has been altered successfully");
        output = getJSON(testDataLoc);
        updateProductionURPS('satellite', 5, false, recipes, output);
        return fsPromises.writeFile(testDataLoc, JSON.stringify(output, null, 4))
    })
    .then(() => {
        console.log("File has been altered successfully");
        output = getJSON(testDataLoc);
        updateProductionURPS('iron-plate', 20, false, recipes, output);
        return fsPromises.writeFile(testDataLoc, JSON.stringify(output, null, 4))
    })
    .catch((err) => {
        console.error(err);
        return;
    });

/** 
fs.writeFile(testDataLoc, JSON.stringify(output, null, 4), (err) => {
    if (err) {
        console.error(err);
        return;
    } else {
        console.log("File has been written successfully\n");

        output = getJSON(testDataLoc);
        updateProductionURPS('inserter', 34, true, recipes, output);
        fs.writeFile(testDataLoc, JSON.stringify(output, null, 4), (err) => {
            if (err) {
                console.error(err);
                return;
            } else {
                //let outputThree = getJSON(testDataLoc);
                //updateProductionURPS('inserter', 35, false, recipes, output);
                
            }
        });
    }
});
*/