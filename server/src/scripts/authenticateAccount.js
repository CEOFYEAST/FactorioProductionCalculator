const CredentialsCollectionName = process.env["CREDENTIALS_COLLECTION"]
const DatabaseName = process.env["DATABASE"]
const verifyPassword = require('./verifyPassword')

async function authenticateAccount(app, username, userPassword){
    await app.ready()
    let db = app.mongo.client.db(DatabaseName);
    let coll = db.collection(CredentialsCollectionName);
    const query = { username: username };
    let result = await coll.findOne(query);
    if(result == null) return false;
    const hash = result.password
    return await verifyPassword(hash, userPassword)
}

module.exports = authenticateAccount

