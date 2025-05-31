const SaveSlotsCollectionName = readConfig(process.env["SAVE_SLOTS_COLLECTION"])
const DatabaseName = readConfig(process.env["DATABASE"])

async function updateSaveSlots(app, username, currentSlotData) {
    await app.ready();
    let db = app.mongo.client.db(DatabaseName);
    let coll = db.collection(SaveSlotsCollectionName);
    for (let i = 1; i <= 3; i++) {
        const query = { username: username, index: i };
        const update = { $set: { data: currentSlotData[i] } };
        await coll.updateOne(query, update, { upsert: true });
    }
}


