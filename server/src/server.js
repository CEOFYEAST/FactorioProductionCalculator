#!/usr/bin/env node

'use strict'

// Require the framework
const Fastify = require('fastify')
const path = require('node:path')

// Instantiate Fastify with some config
const app = Fastify({
  logger: true,
  pluginTimeout: 10000
})

app.register(require('@fastify/static'), {
  root: 'C:/Users/bento/Workspace/VS Projects/FactorioProductionCalculator/client/dist',
})
app.register(require('@fastify/cors'), {})
app.register(require('@fastify/swagger'), {})
app.register(require('@fastify/swagger-ui'), {})
app.register(require('./routes/items.js'))
app.register(require('./routes/users.js'))

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
