#!/usr/bin/env node

'use strict'

const Fastify = require('fastify')
//const root = 'C:/Users/bento/Workspace/VS Projects/FactorioProductionCalculator/client/dist'
const DBUrl = require('./scripts/secure.module.js')
const PORT = 3000
const HOST = 'localhost'
const registerDB = true

const app = Fastify({
  logger: true,
  pluginTimeout: 10000
})
app.decorateRequest('app', {
  getter () {
    return app
  }
})

if(registerDB){
  app.register(require('@fastify/mongodb'), {
    // force to close the mongodb connection when app stopped
    // the default value is false
    forceClose: true,
    url: DBUrl
  })
}
// app.register(require('@fastify/static'), {
//   root: root,
//   constraints: { host: 'localhost:3000' }
// })
app.register(require('@fastify/cors'), {})
app.register(require('@fastify/formbody'), {})
app.register(require('@fastify/swagger'), {})
app.register(require('@fastify/swagger-ui'), {
  routePrefix: '/documentation'
})
app.register(require('./routes/items.js'))
app.register(require('./routes/users.js'))

// Start listening.
app.listen({ port: PORT, host: HOST}, (err, address) => {
  if (err) {
    console.error(err);
    throw err;
  }
  console.log(`Fastify server is running on ${address}`);
  app.swagger()
});

  