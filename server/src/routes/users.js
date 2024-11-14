const {getUser, addUser} = require('../controllers/users')

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
    handler: getUser
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
    handler: addUser
}

function userRoutes(fastify, options, done){
    // get all items
    fastify.get('/users', getUserOpts)
    
    // add item
    fastify.post('/users', postUserOpts)

    done()
}

module.exports = userRoutes