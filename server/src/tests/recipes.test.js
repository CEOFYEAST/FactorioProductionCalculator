const { getRecipes } = require("../scripts/recipes.module")

test('recipes validity', () => {
    expect(typeof getRecipes()).toBe('object')
})