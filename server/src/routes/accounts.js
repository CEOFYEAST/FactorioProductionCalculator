const {handleUserAccess, handleUserCreation} = require('../controllers/accounts')
const {StatusOnlyResponseSchema} = require('../schemas/shared-schemas')

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

function accountsRoutes(fastify, options, done){
    // get all items
    fastify.post('/accounts/access', accessUserOpts)
    
    // add item
    fastify.post('/accounts/create', createUserOpts)

    done()
}

module.exports = accountsRoutes