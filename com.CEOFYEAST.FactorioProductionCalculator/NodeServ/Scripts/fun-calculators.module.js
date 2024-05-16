function mostComplicatedRecipe(recipes){
    let max = "inserter";

    recipes.keys().foreach((key) => function(key){
        let recipe = recipes[key];
        let recipeType = recipe["Type"];
        
        if (recipeType != "Resource" && recipeType != "Liquid") {
            let maxRecipe = recipes[max];
            let recipeType = recipe["Type"];
        }
    });
}