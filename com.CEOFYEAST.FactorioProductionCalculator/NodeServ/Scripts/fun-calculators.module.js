// calculates recipe with most required ingredients (has harcoded vals, lacks error handling/preconditions, and arbitrarily chooses recipe with most ingredients if multiple recipes with the same number of ingredients exist)
function mostComplicatedRecipe(recipes){
    function determineIngredientsCount(id){
        let recipe = recipes[id];
        let recipeInfo = recipe["recipe"];
        let ingredients = recipeInfo["ingredients"];
        return ingredients.length;
    }

    let max = "inserter";
    let maxIngredientsCount = determineIngredientsCount(max);

    Object.keys(recipes).forEach((key) => {
        let recipe = recipes[key];
        let recipeType = recipe["Type"];
        
        if (recipeType != "Resource" && recipeType != "Liquid") {
            let currentIngredientsCount = determineIngredientsCount(key);
            
            if(currentIngredientsCount > maxIngredientsCount){
                maxIngredientsCount = currentIngredientsCount;
                max = key;
            }
        }
    });

    return max;
}

module.exports = {
    mostComplicatedRecipe
}