/**
 * Acts as the entrypoint for the node server.
 * 
 * @module index
 * @author Benton Diebold (CEOFYEAST)
 */

const { calculateChildrenURPS } = require('./calculators.module.js');
const { getJSON, writeObj, recipesLoc, testDataLoc } = require('./utility.module.js');
const { updateProduction, updateProductionURPS, tryAddToOutput, printOutput } = require('./output.module.js');
const fs = require('fs');
const fsPromises = require('fs').promises; 
const { MongoClient, ServerApiVersion } = require('mongodb');

const username = encodeURIComponent("CEOFYEAST");
const password = encodeURIComponent("AwD1SeD1DrG");
const uri = "mongodb+srv://CEOFYEAST:AwD1SeD1DrG@yeastcluster.dqbtsia.mongodb.net/?retryWrites=true&w=majority&appName=YeastCluster";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

