const {handleUserAccess, handleUserCreation} = require('../controllers/users')

const UserRequest = {
    type: 'object',
    required: ['userName', 'userPassword'],
    properties: {
        userName: { type: 'string' },
        userPassword: { type: 'string' }
    }
}

const UserResponse = {
    type: 'object',
    required: ['userName', 'userPassword', 'factories'],
    properties: {
        userName: { type: 'string' },
        userPassword: { type: 'string' },
        factories: { 
            type: 'array',
            maxItems: 3
        }
    }
}

// const TestSchema = {
//     type: 'object',
//     required: ['testPropOne', 'testPropTwo', 'testPropThree'],
//     properties: {
//         testPropOne: { type: 'string' },
//         testPropTwo: { type: 'object' },
//         testPropThree: { 
//             type: 'array',
//             maxItems: 3
//         }
//     }
// }

const accessUserOpts = {
    schema: {
        body: UserRequest,
        response: {
            200: UserResponse
        }
    },
    handler: handleUserAccess
}

const createUserOpts = {
    schema: {
        body: UserRequest,
        response: {
            '2xx': UserResponse
        }
    },
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