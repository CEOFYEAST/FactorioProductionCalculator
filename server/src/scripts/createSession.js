const querySession = require('./querySession.js')
const DatabaseName = process.env["DATABASE"]
const SessionsCollectionName = process.env["SESSIONS_COLLECTION"]

async function createSession(app, sessionId, session){
    if(app === undefined || app === null) return
    console.log(`\n Setting Session: ${sessionId} w/ App ${app} \n`)
    const existingSession = await querySession(app, sessionId)
    console.log(`\n Session Already Exists: ${existingSession !== null} \n`)
    await app.ready()
    let db = app.mongo.client.db(DatabaseName);
    let coll = db.collection(SessionsCollectionName);
    let toInsert = {
        sessionId: sessionId,
        session: session
    }
    if(existingSession) await coll.replaceOne({sessionId: sessionId}, toInsert)
    else await coll.insertOne(toInsert)
    console.log(`\n Session Set: ${sessionId} w/ App ${app} \n`)
}

module.exports = createSession