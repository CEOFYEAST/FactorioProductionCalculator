const {handleGetUser, handleCreateUser} = require('../controllers/users')

const User = {
    type: 'object',
    properties: {
        id: {type: 'string'},
        name: {type: 'string'}
    }
}

const getUserOpts = {
    // schema: {
    //     response: {
    //         200: {
    //             type: 'array',
    //             items: Item
    //         }
    //     }
    // },
    handler: handleGetUser
}

const postUserOpts = {
    // schema: {
    //     body: { 
    //         type: 'object',
    //         required: ['name'],
    //         properties: {
    //             name: { type: 'string' }
    //         }
    //      },
    //     response: {
    //         201: Item
    //     }
    // },
    handler: handleCreateUser
}

function userRoutes(fastify, options, done){
    // get all items
    fastify.post('/users/access', getUserOpts)
    
    // add item
    fastify.post('/users/create', postUserOpts)

    done()
}

module.exports = userRoutes