#!/usr/bin/env node

'use strict'

const Fastify = require('fastify')
const DBUrl = process.env["DB_URL"]
const Secret = process.env["COOKIE_SIG"]
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
  origin: true, // or your frontend URL
  credentials: true
})
app.register(require('@fastify/formbody'), {})
app.register(require('@fastify/swagger'), {})
app.register(require('@fastify/swagger-ui'), {
  routePrefix: '/documentation'
})
app.register(require('@fastify/session'), {
  cookieName: 'sessionId',
  secret: Secret,
  cookie: {
    maxAge: 1800000, secure: false 
  }
})
app.register(require('./routes/users.js'))
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

  