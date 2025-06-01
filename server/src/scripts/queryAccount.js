const CredentialsCollectionName = process.env["CREDENTIALS_COLLECTION"]
const DatabaseName = process.env["DATABASE"]

async function queryAccount(app, username){
    await app.ready()
    let db = app.mongo.client.db(DatabaseName);
    let coll = db.collection(CredentialsCollectionName);
    const query = { username: username };
    let result = await coll.findOne(query);
    console.log("Result:", result != null);
    return result != null;
}

module.exports = queryAccount
