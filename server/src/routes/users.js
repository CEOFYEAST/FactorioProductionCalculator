const {handleUserAccess, handleUserCreation} = require('../controllers/users')

const UserRequestSchema = {
    type: 'object',
    required: ['username', 'userPassword'],
    properties: {
        username: { type: 'string' },
        userPassword: { type: 'string' }
    }
}

const LoginResponseSchema = {
    type: 'object',
    description: 'a success response including user data',
    required: ['statusMessage', 'username'],
    properties: {
        statusMessage: { type: 'string' },
        username: { type: 'string' },
    }
}

const StatusOnlyResponseSchema = {
    type: 'object',
    description: 'a status message response',
    required: ['statusMessage'],
    properties: {
        statusMessage: { type: 'string' }
    }
}

const accessUserOpts = {
    schema: {
        body: UserRequestSchema,
        response: {
            200: LoginResponseSchema,
            403: StatusOnlyResponseSchema
        }
    },
    handler: handleUserAccess
}

const createUserOpts = {
    schema: {
        body: UserRequestSchema,
        response: {
            201: StatusOnlyResponseSchema,
            400: StatusOnlyResponseSchema,
            500: StatusOnlyResponseSchema
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