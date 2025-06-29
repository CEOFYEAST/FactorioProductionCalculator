const {handleUserAccess, handleUserCreation, handleUserLogout} = require('../controllers/accounts')
const {StatusOnlyResponseSchema} = require('../schemas/shared')

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
            403: StatusOnlyResponseSchema,
            404: StatusOnlyResponseSchema
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

const logoutUserOpts = {
    schema: {
        body: {},
        response: {
            200: StatusOnlyResponseSchema,
            400: StatusOnlyResponseSchema,
            500: StatusOnlyResponseSchema
        }
    },
    handler: handleUserLogout
}

function accountsRoutes(fastify, options, done){
    fastify.post('/user/account/access', accessUserOpts)
    fastify.post('/user/account/create', createUserOpts)
    fastify.post('/user/account/logout', logoutUserOpts)
    done()
}

module.exports = accountsRoutes