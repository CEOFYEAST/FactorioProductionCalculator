const DatabaseName = process.env["DATABASE"]
const SessionsCollectionName = process.env["SESSIONS_COLLECTION"]

/**
 * @throws If error occurred when attempting operation on db
 * @returns Boolean indicating whether any documents were destroyed
 */
async function destroySession(app, sessionId){
    if(app === undefined || app === null) return
    console.log(`\n Destroying Session: ${sessionId} w/ App ${app} \n`)
    await app.ready()
    const db = app.mongo.client.db(DatabaseName)
    const coll = db.collection(SessionsCollectionName)
    const query = { sessionId: sessionId }
    const result = await coll.deleteMany(query)
    console.log("Deletion Result: ", result)
    if(result.deletedCount > 0)
    {
        console.log(`\n Session Destroyed: ${sessionId} w/ App ${app} \n`)
        return true
    }
    return false
}

module.exports = destroySession