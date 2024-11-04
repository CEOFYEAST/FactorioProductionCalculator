// const fastify = require('fastify')({logger: true})

// fastify.register(require('@fastify/cors'), {})
// fastify.register(require('@fastify/swagger'), {})
// fastify.register(require('@fastify/swagger-ui'), {
//     routePrefix: '/docs',
//     uiConfig: {
//         docExpansion: 'full',
//         deepLinking: false
//     },
//     uiHooks: {
//         onRequest: function (request, reply, next) { next() },
//         preHandler: function (request, reply, next) { next() }
//     },
//     staticCSP: true,
//     transformStaticCSP: (header) => header,
//     transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
//     transformSpecificationClone: true
// })
// fastify.register(require('./routes/items.js'))

// const start = async () => {
//     try {
//         await fastify.listen(process.env.PORT || 5001)
//     } catch(error) {
//         fastify.log.error(error)
//         process.exit(1)
//     }
// }

// start()


'use strict'

// Read the .env file.
//require('dotenv').config()

// Require the framework
const Fastify = require('fastify')

// Instantiate Fastify with some config
const app = Fastify({
  logger: true,
  pluginTimeout: 10000
})

app.register(require('@fastify/cors'), {})
app.register(require('@fastify/swagger'), {})
app.register(require('@fastify/swagger-ui'), {})
app.register(require('./routes/items.js'))

const PORT = process.env.PORT || 3000;
//const HOST = 'factorio-production-calculator.com'
const HOST = 'localhost'

// Start listening.
app.listen({ port: PORT, host: HOST}, (err, address) => {
    if (err) {
      console.error(err);
      throw err;
    }
    console.log(`Fastify server is running on ${address}`);
  });
