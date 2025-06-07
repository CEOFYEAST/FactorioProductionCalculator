const {BackendSlotSchema} = require('../schemas/shared')
const CredentialsCollectionName = process.env["CREDENTIALS_COLLECTION"]
const SaveSlotsCollectionName = process.env["SAVE_SLOTS_COLLECTION"]
const DatabaseName = process.env["DATABASE"]

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
    await app.ready()
    let db = app.mongo.client.db(DatabaseName);
    let coll = db.collection(SaveSlotsCollectionName);
    for (let i = 1; i <= 3; i++) {
        let toInsert = {
            ...BackendSlotSchema,
            index: i
        }
        await coll.insertOne(toInsert);
    }
}

module.exports = createAccount