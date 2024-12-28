app = require("../server.js");

const getUser = (req, reply) => {
    console.log(req.body)
    reply.send(req.body)
}

const addUser = (req, reply) => {
    console.log("-------------------------------------------------\n")

    console.log(req.body)
    const { userName, userPassword } = req.body

    const db = app.mongo.client.db("sample_users");
    const coll = db.collection("users")
    const doc = { userName: userName, userPassword: userPassword }
    coll.insertOne(doc);
    
    console.log("-------------------------------------------------\n")
    reply.code(201).send(JSON.stringify(req.body))
}

module.exports = {
    getUser,
    addUser
}