#!/usr/bin/env node

'use strict'

const readConfig = require('./scripts/readConfig.js')
const Fastify = require('fastify')
const DBUrl = process.env["DB_URL"]
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
    forceClose: true,
    url: DBUrl
  })
}
app.register(require('@fastify/cookie'))
app.register(require('@fastify/cors'), {
  origin: true,
  credentials: true
})
app.register(require('@fastify/formbody'), {})
app.register(require('@fastify/swagger'), {})
app.register(require('@fastify/swagger-ui'), {
  routePrefix: '/documentation'
})
app.register(require('./routes/accounts.js'))
app.register(require('./routes/save-slots.js'))
app.register(require('./routes/recipes.js'))

// Start listening.
app.listen({ port: PORT, host: HOST}, (err, address) => {
  if (err) {
    console.error(err);
    throw err;
  }
  console.log(`Fastify server is running on ${address}`);
  app.swagger()
});

  