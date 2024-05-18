/**
 * Module for finding the most complicated recipe from a collection of recipes.
 * 
 * @module fun-calculators
 * @author Benton Diebold (CEOFYEAST)
 */

/**
 * Finds the most complicated recipe from the provided recipes object.
 *
 * @param {Object} recipes - The object containing the recipes.
 * @returns {string} - The ID of the most complicated recipe.
 * @throws {Error} - If no recipes are provided or if no complicated recipe is found.
 */
function mostComplicatedRecipe(recipes) {
    /**
     * Determines the count of ingredients required for a given recipe ID.
     *
     * @param {string} id - The ID of the recipe.
     * @returns {number} The count of ingredients required.
     */
    function determineIngredientsCount(id) {
        let recipe = recipes[id];
        let recipeInfo = recipe["recipe"];
        let ingredients = recipeInfo["ingredients"];
        return ingredients.length;
    }

    if (!recipes || Object.keys(recipes).length === 0) {
        throw new Error("No recipes provided");
    }

    let max = null;
    let maxIngredientsCount = 0;

    Object.keys(recipes).forEach((key) => {
        let recipe = recipes[key];
        let recipeType = recipe["Type"];

        if (recipeType !== "Resource" && recipeType !== "Liquid") {
            let currentIngredientsCount = determineIngredientsCount(key);

            if (currentIngredientsCount > maxIngredientsCount) {
                maxIngredientsCount = currentIngredientsCount;
                max = key;
            }
        }
    });

    if (max === null) {
        throw new Error("No complicated recipe found");
    }

    return max;
}

module.exports = {
    mostComplicatedRecipe,
};