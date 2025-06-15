const DatabaseName = process.env["DATABASE"]
const SessionsCollectionName = process.env["SESSIONS_COLLECTION"]

async function querySession(app, sessionId){
    let session = null
    await app.ready().then(() => {
        let db = app.mongo.client.db(DatabaseName);
        let coll = db.collection(SessionsCollectionName);
        const query = { sessionId: sessionId };
        coll.findOne(query).then((result) => {
            if(result) session = result.session
        })
    })
    console.log(`\n Session Grabbed: ${session} \n`)
    return session
}

module.exports = querySession