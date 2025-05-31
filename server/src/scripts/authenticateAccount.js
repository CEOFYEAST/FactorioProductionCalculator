const CredentialsCollectionName = readConfig(process.env["CREDENTIALS_COLLECTION"])
const DatabaseName = readConfig(process.env["DATABASE"])

async function authenticateAccount(app, username, userPassword){
    await app.ready()
    let db = app.mongo.client.db(DatabaseName);
    let coll = db.collection(CredentialsCollectionName);
    const query = { username: username };
    let result = await coll.findOne(query);
    return (result != null && result.password == userPassword)
}

