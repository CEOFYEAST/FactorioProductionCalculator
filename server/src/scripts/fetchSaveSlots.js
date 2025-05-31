const SaveSlotsCollectionName = readConfig(process.env["SAVE_SLOTS_COLLECTION"])
const DatabaseName = readConfig(process.env["DATABASE"])

async function fetchSaveSlots(app, username){
    toReturn = {
        1: {},
        2: {},
        3: {}
    }
    await app.ready()
    let db = app.mongo.client.db(DatabaseName);
    let coll = db.collection(SaveSlotsCollectionName);
    for(let i in Range(1,3)){
        const query = { username: username, index: i };
        const options = {
            projection: { _id: 0, index: 0, data: 1 }
        };
        let result = await coll.findOne(query, options);
        toReturn[i] = result.data
    }
    return toReturn
}