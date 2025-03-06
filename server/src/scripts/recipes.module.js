const recipesLoc ="src\\data\\recipes.json";
var fs = require('fs');

function getRecipes(){
    return getJSON(recipesLoc)
}

function getJSON(jsonLoc) {
    return JSON.parse(fs.readFileSync(jsonLoc, 'utf8'));
}

module.exports = {
    getRecipes
}