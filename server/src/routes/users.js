const {handleUserAccess, handleUserCreation} = require('../controllers/users')

const UserRequestSchema = {
    type: 'object',
    required: ['username', 'userPassword'],
    properties: {
        username: { type: 'string' },
        userPassword: { type: 'string' }
    }
}

const UserDataSchema = {
    type: 'object',
    description: 'Successful response',
    required: ['statusMessage', 'username', 'userPassword', 'factories'],
    properties: {
        username: { type: 'string' },
        userPassword: { type: 'string' },
        factories: { 
            type: 'array',
            maxItems: 3
        }
    },
    example: 
    {
        username: "ceofyeast",
        userPassword: "somePassword",
        factories: [
            {
                id: "factoryOne"
            },
            {
                id: "factoryTwo"
            },
            {
                id: "factoryThree"
            }
        ]
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
    // schema: {
    //     body: UserRequest,
    //     response: {
    //         200: UserResponse
    //     }
    // },
    handler: handleUserAccess
}

const createUserOpts = {
    // schema: {
    //     body: UserRequest
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