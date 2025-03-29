let {handleRecipesGet} = require('../controllers/recipes.js')

const getRecipesOpts = {
    handler: handleRecipesGet
}

function recipesRoutes(fastify, options, done){
    fastify.post('/recipes', getRecipesOpts)

    done()
}

module.exports = recipesRoutes