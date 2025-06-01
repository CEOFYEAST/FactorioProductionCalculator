const {FrontendSlotSchema} = require('../schemas/shared-schemas')
const SaveSlotsCollectionName = process.env["SAVE_SLOTS_COLLECTION"]
const DatabaseName = process.env["DATABASE"]

async function fetchSaveSlots(app, username){
    let toReturn = { ...FrontendSlotSchema }
    await app.ready()
    let db = app.mongo.client.db(DatabaseName);
    let coll = db.collection(SaveSlotsCollectionName);
    for (let i = 1; i <= 3; i++) {
        const query = { username: username, index: i };
        const options = {
            projection: { data: 1 }
        };
        let result = await coll.findOne(query, options);
        toReturn[i] = result ? result.data : {};
    }
    return toReturn
}

module.exports = fetchSaveSlots