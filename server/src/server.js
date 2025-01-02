#!/usr/bin/env node

'use strict'

// Require the framework
const Fastify = require('fastify')
const root = 'C:/Users/bento/Workspace/VS Projects/FactorioProductionCalculator/client/dist'
const DBUserPassword = require('./secure.module.js')

// Instantiate Fastify with some config
const app = Fastify({
  logger: true,
  pluginTimeout: 10000
})

module.exports = app;

app.register(require('@fastify/mongodb'), {
  // force to close the mongodb connection when app stopped
  // the default value is false
  forceClose: true,

  url: `mongodb+srv://myAtlasDBUser:${DBUserPassword}@myatlasclusteredu.3iqhyav.mongodb.net/?retryWrites=true&w=majority&appName=myAtlasClusterEDU`
})
app.register(require('@fastify/static'), {
  root: root,
  constraints: { host: 'localhost:3000' }
})
app.register(require('@fastify/cors'), {})
app.register(require('@fastify/formbody'), {})
app.register(require('@fastify/swagger'), {})
app.register(require('@fastify/swagger-ui'), {})
app.register(require('./routes/items.js'))
app.register(require('./routes/users.js'))

// app.route({
//   method: 'GET',
//   url: '/*',
//   handler: function (request, reply) {
//     reply.send({  })
//   }
// })

const PORT = process.env.PORT || 3000;
const HOST = 'localhost'

// Start listening.
app.listen({ port: PORT, host: HOST}, (err, address) => {
    if (err) {
      console.error(err);
      throw err;
    }
    console.log(`Fastify server is running on ${address}`);
  });
  