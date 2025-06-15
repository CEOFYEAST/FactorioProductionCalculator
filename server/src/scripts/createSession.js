const querySession = require('./querySession.js')
const DatabaseName = process.env["DATABASE"]
const SessionsCollectionName = process.env["SESSIONS_COLLECTION"]

async function createSession(app, sessionId, session){
    const existingSession = await querySession(app, sessionId)
    if(existingSession) throw new Error("Session with given ID already exists")
    await app.ready()
    let db = app.mongo.client.db(DatabaseName);
    let coll = db.collection(SessionsCollectionName);
    let toInsert = {
        sessionId: sessionId,
        session: session
    }
    const document = await coll.insertOne(toInsert)
    return document === true
}

module.exports = createSession