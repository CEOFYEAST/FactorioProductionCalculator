const DatabaseName = process.env["DATABASE"]
const SessionsCollectionName = process.env["SESSIONS_COLLECTION"]

async function querySession(app, sessionId){
    console.log("\n         [querySession]         \n")
    console.log(`\n Getting Session: ${sessionId} w/ App ${app} \n`)
    await app.ready()
    let db = app.mongo.client.db(DatabaseName);
    let coll = db.collection(SessionsCollectionName);
    const query = { sessionId: sessionId };

    const sessionDoc = await coll.findOne(query)
    console.log(`\n Session Grabbed: ${sessionDoc}, truthiness: ${sessionDoc !== null} \n`)
    if(sessionDoc !== null && sessionDoc !== undefined) {
        return sessionDoc.session
    }
    return null
}

module.exports = querySession