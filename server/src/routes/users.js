const {handleUserAccess, handleUserCreation} = require('../controllers/users')

// const UserRequestSchema = {
//     type: 'object',
//     required: ['username', 'userPassword'],
//     properties: {
//         username: { type: 'string' },
//         userPassword: { type: 'string' }
//     }
// }

// const UserDataSchema = {
//     type: 'object',
//     description: 'user data',
//     required: ['username', 'userPassword', 'factories'],
//     properties: {
//         username: { type: 'string' },
//         userPassword: { type: 'string' },
//         factories: { 
//             type: 'array',
//             description: 'Factory data',
//             maxItems: 3
//         }
//     },
//     example: 
//     {
//         username: "ceofyeast",
//         userPassword: "somePassword",
//         factories: [
//             {
//                 id: "factoryOne"
//             },
//             {
//                 id: "factoryTwo"
//             },
//             {
//                 id: "factoryThree"
//             }
//         ]
//     }
// }

// const UserDataResponseSchema = {
//     type: 'object',
//     description: 'a success response including user data',
//     required: ['statusMessage', 'userData'],
//     properties: {
//         statusMessage: { type: 'string' },
//         userData: UserDataSchema,
//     }
// }

// const StatusOnlyResponseSchema = {
//     type: 'object',
//     description: 'a status message response',
//     required: ['statusMessage'],
//     properties: {
//         statusMessage: { type: 'string' }
//     }
// }

const accessUserOpts = {
    // schema: {
    //     body: UserRequestSchema,
    //     response: {
    //         200: UserDataResponseSchema,
    //         403: StatusOnlyResponseSchema
    //     }
    // },
    handler: handleUserAccess
}

const createUserOpts = {
    // schema: {
    //     body: UserRequestSchema,
    //     response: {
    //         201: StatusOnlyResponseSchema,
    //         400: StatusOnlyResponseSchema,
    //         500: StatusOnlyResponseSchema
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