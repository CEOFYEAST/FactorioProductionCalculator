function getRecipes(){
  $.getJSON("https://kevinta893.github.io/factorio-recipes-json/recipes.dictionary.min.json", function (json, err){
      if (err != "success"){
          console.log("Error cannot load json\n" + err);
          return;
      }
  
      let recipesDict = json;

      let output = {};

      calculateChildrenURPS("inserter", 3, recipesDict, output)
    
      console.log(output);
  });
}

//- Using a function pointer:
document.getElementById("button").onclick = getRecipes();

function calculateChildrenURPS(parentID, parentURPS, recipes, output)
{
  if(parentID == "")
  {
    throw "id cannot be empty";
  }
  if (!recipes.hasOwnProperty(parentID)) {
    throw "Recipe with id '" + id + "' not found in recipesDict";
  }

  let parent = recipes[parentID];
  let parentType = parent["Type"];
  
  // base case
  if(parentType == "Resource" || parentType == "Liquid")
  {
    return;
  }
  
  let parentRecipe = parent["recipe"];
  let parentUPPC = parentRecipe["yield"];
  let parentCRPS = parentURPS/parentUPPC;
  let parentIngredients = parentRecipe["ingredients"];

  console.log(parentRecipe);
  console.log(parentIngredients);

  // runs for every ingredient
  for(let ingredientKey in parentIngredients)
  {
    let ingredientDict = parentIngredients[ingredientKey];
    console.log("running for child...");
    console.log(ingredientDict);
    let childID = ingredientDict["id"];
    let child = recipes[childID];
    let childType = child["Type"];
    let childURPC = ingredientDict["amount"];
    let childURPS = childURPC * parentCRPS;

    
    // if child ingredient does not have corresponding output.
    if (!output.hasOwnProperty(childID)) {
      let childOutputVals = {
        "URPS": 0,
        "CR": 0
      };

      if(childType == "Resource" || childType == "Liquid")
      {
        childOutputVals = {
          "URPS": 0,
        };
      }

      output[childID] = childOutputVals;

      console.log(output + ", output updated");
    }

    let childOutput = output[childID];

    childOutput["URPS"] += childURPS;

    calculateChildrenURPS(childID, childURPS, recipes, output);
  }
}

function calculateCR()
{
  
}