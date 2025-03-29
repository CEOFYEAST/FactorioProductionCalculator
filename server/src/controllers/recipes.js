// const fs = require('fs');
// const path = require('path');
// const { fileURLToPath } = require('url');
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

export const handleRecipesGet = (req, reply) => {
    const src = path.dirname(
        fileURLToPath(path.dirname(import.meta.url))
    )
    const recipesPath = path.join(src, "/data/recipes.json")
    const recipes = JSON.parse(fs.readFileSync(recipesPath, 'utf8'));
    return reply.code(200).send(recipes);
}

