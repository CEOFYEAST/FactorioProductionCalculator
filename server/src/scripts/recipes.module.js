const recipesLoc ="src\\data\\recipes.json";
import fs from 'fs'
const recipes = getJSON(recipesLoc)
const validIDs = Object.keys(recipes);

function getJSON(jsonLoc) {
    return JSON.parse(fs.readFileSync(jsonLoc, 'utf8'));
}

export { recipes, validIDs }