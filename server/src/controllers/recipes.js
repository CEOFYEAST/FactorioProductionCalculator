// const fs = require('fs');
// const path = require('path');
// const { fileURLToPath } = require('url');
const fs = require('fs')
const path = require('path')
const { fileURLToPath, pathToFileURL } = require('url')
const metaUrl = pathToFileURL(__filename).href;

const handleRecipesGet = (req, reply) => {
    const src = path.dirname(
        fileURLToPath(path.dirname(metaUrl))
    )
    const recipesPath = path.join(src, "/data/recipes.json")
    const recipes = JSON.parse(fs.readFileSync(recipesPath, 'utf8'));
    return reply.code(200).send(recipes);
}

module.exports = handleRecipesGet
