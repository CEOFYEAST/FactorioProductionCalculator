const CredentialsCollectionName = readConfig(process.env["CREDENTIALS_COLLECTION"])
const SaveSlotsCollectionName = readConfig(process.env["SAVE_SLOTS_COLLECTION"])
const DatabaseName = readConfig(process.env["DATABASE"])

async function createAccount(app, username, userPassword){
    await Promise.all([
        insertCredentials(app, username, userPassword),
        insertSaveSlots(app, username)
    ])
}

async function insertCredentials(app, username, userPassword){
    let credentials = { 
        username: username, 
        password: userPassword,
    }
    await app.ready()
    let db = app.mongo.client.db(DatabaseName);
    let coll = db.collection(CredentialsCollectionName);
    await coll.insertOne(credentials);
}

async function insertSaveSlots(app, username){
    let slotSchema = {
        username: username,
        index: 1,
        data: {}
    }
    await app.ready()
    let db = app.mongo.client.db(DatabaseName);
    let coll = db.collection(SaveSlotsCollectionName);
    for(let i in Range(1,3)) {
        let toInsert = {
            ...slotSchema,
            index: i
        }
        await coll.insertOne(toInsert);
    }
}

module.exports = createAccount