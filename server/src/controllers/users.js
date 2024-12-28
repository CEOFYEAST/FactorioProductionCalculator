app = require("../server.js");

const getUser = (req, reply) => {
    console.log(req.body)
    reply.send(req.body)
}

const addUser = (req, reply) => {
    const { userName, userPassword } = req.body

    let db = app.mongo.client.db("sample_users");
    let coll = db.collection("users")
    checkForUser(coll, userName, userPassword).then((response) => {
        let userExists = response;
        if(!userExists) {
            let doc = { userName: userName, userPassword: userPassword }
            coll.insertOne(doc);
        }

        checkForUser(coll, userName, userPassword).then((response) => {
            let userExists = response;
            if(!userExists) reply.code(500).send("User POST Failed");
            else reply.code(201).send("User POST Success");
        })
    })
}

async function checkForUser(coll, userName, userPassword) {

    // Query for a movie that has the title 'The Room'
    const query = { userName: userName, userPassword: userPassword };

    const options = {
        projection: { _id: 0, userName: 1, userPassword: 1 }
    };
      
    const result = await coll.findOne(query, options);

    if(result == null) return false;
    return true;
}

module.exports = {
    getUser,
    addUser
}