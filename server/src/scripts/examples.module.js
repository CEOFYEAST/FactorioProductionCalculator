/**
 * Example of initializing and updating an output object multiple times.
 */
function multipleProductionUpdatesExample(){
    var recipes = getJSON(recipesLoc);
    let output = {};
    updateProductionURPS('inserter', 1, false, recipes, output);
    fsPromises.writeFile(testDataLoc, JSON.stringify(output, null, 4))
        .then(() => {
            console.log("File has been written successfully");
        })
        .then(() => {
            output = getJSON(testDataLoc);
            updateProductionURPS('long-handed-inserter', 1, false, recipes, output);
            return fsPromises.writeFile(testDataLoc, JSON.stringify(output, null, 4))
        })
        .then(() => {
            output = getJSON(testDataLoc);
            updateProductionURPS('automation-science-pack', 1, false, recipes, output);
            return fsPromises.writeFile(testDataLoc, JSON.stringify(output, null, 4))
        })
        .then(() => {
            output = getJSON(testDataLoc);
            updateProductionURPS('assembling-machine-1', 0.2, false, recipes, output);
            return fsPromises.writeFile(testDataLoc, JSON.stringify(output, null, 4))
        })
        .catch((err) => {
            console.error(err);
            return;
        });
}