const {handleUserAccess, handleUserCreation} = require('../controllers/users')

// const User = {
//     type: 'object',
//     required: ['userName', 'userPassword', 'factories'],
//     properties: {
//         userName: { type: 'string' },
//         userPassword: { type: 'string' },
//         factories: { 
//             type: 'array',
//             maxItems: 3
//         }
//     }
// }

const accessUserOpts = {
    // schema: {
    //     response: {
    //         200: {
    //             schema: User
    //         }
    //     }
    // },
    handler: handleUserAccess
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
    handler: handleUserCreation
}

function userRoutes(fastify, options, done){
    // get all items
    fastify.post('/users/access', accessUserOpts)
    
    // add item
    fastify.post('/users/create', createUserOpts)

    done()
}

module.exports = userRoutes