app = require("../server.js");

const handleGetUser = (req, reply) => {
    const { userName, userPassword } = req.body

    let db = app.mongo.client.db("sample_users");
    let coll = db.collection("users")
    checkForUser(coll, userName, userPassword).then((response) => {
        let userExists = response != null;
        if(!userExists) reply.code(500).send("User POST Failed");
        else reply.code(201).send(response);
    })
}

const handleCreateUser = (req, reply) => {
    const { userName, userPassword } = req.body

    let db = app.mongo.client.db("sample_users");
    let coll = db.collection("users")
    checkForUser(coll, userName, userPassword).then((response) => {
        let userExists = response != null;
        console.log("User Exists: " + userExists)
        if(!userExists) {
            let doc = { 
                userName: userName, 
                userPassword: userPassword,
                factories: [
                    {
                        name: "inserter",
                        URPS: 100,
                        CURPS: 200
                    }
                ]
            }
            coll.insertOne(doc);
        }

        checkForUser(coll, userName, userPassword).then((response) => {
            let userExists = response != null;
            if(!userExists) reply.code(500).send("User POST Failed");
            else reply.code(201).send(response);
        })
    })
}

async function checkForUser(coll, userName, userPassword) {

    // Query for a movie that has the title 'The Room'
    const query = { userName: userName, userPassword: userPassword };

    const options = {
        projection: { _id: 0, userName: 1, userPassword: 1, factories: 1 }
    };
      
    const result = await coll.findOne(query, options);

    return result;
}

module.exports = {
    handleGetUser,
    handleCreateUser
}