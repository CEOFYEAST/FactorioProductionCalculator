const {handleAccessUser, handleCreateUser} = require('../controllers/users')

const User = {
    type: 'object',
    properties: {
        id: {type: 'string'},
        name: {type: 'string'}
    }
}

const accessUserOpts = {
    // schema: {
    //     response: {
    //         200: {
    //             type: 'array',
    //             items: Item
    //         }
    //     }
    // },
    handler: handleAccessUser
}

const createUserOpts = {
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
    fastify.post('/users/access', accessUserOpts)
    
    // add item
    fastify.post('/users/create', createUserOpts)

    done()
}

module.exports = userRoutes