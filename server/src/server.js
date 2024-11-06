#!/usr/bin/env node

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
