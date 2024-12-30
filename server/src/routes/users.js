const {handleUserAccess, handleUserCreation} = require('../controllers/users')

const User = {
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

const accessUserOpts = {
    schema: {
        response: {
            200: {
                User
            }
        }
    },
    handler: handleUserAccess
}

const createUserOpts = {
    schema: {
        response: {
            '2xx': {
                User
            }
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