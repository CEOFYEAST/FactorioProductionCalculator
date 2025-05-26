const usersDatabaseName = "sample_users";
const usersCollectionName = "users";

// the schema for a status message-only response
let statusResponse = { statusMessage: "Server error" };

// the schema for a user data response
let statusAndUserResponse = { statusMessage: "Server error", username: "" };

/**
 * Handles the overall process of accessing a user account, including the response
 * @param {*The initial access request} req 
 * @param {*The response, including the user account accessed, or an error code if the given user couldn't be found} reply 
 */
const handleUserAccess = (req, reply) => {

    const { username, userPassword } = req.body

    fetchUserCollection(req.app).then((coll) => {

        checkForUserWithUsername(coll, username).then((usernameExists) => {
            //if(!usernameExists) reply.code(403).send({ statusMessage: "Account with the given username does not exist" });
            if(!usernameExists) {
                let replyObj = { ...statusResponse };
                replyObj.statusMessage = "Account with the given username does not exist";
                req.session.authenticated = false;
                return reply.code(403).send(replyObj);
            }

            fetchUserFromCollection(coll, username, userPassword).then((user) => {
                let userExists = user != null;
                if(!userExists){
                    let replyObj = { ...statusResponse };
                    replyObj.statusMessage = "Incorrect password";
                    req.session.authenticated = false;
                    return reply.code(403).send(replyObj);
                }
                else {
                    let replyObj = { ...statusAndUserResponse };
                    replyObj.statusMessage = "Account successfully accessed";
                    replyObj.username = username;
                    req.session.authenticated = true;
                    console.log("Session Username: " + req.session.username)
                    req.session.username = username;
                    return reply.code(200).send(replyObj);
                }
            });
        })
    })
}

/**
 * Handles the overall process of creating a user account, including the response
 * @param {*The initial user creation request} req 
 * @param {*The response, including the user account created, or an error code if the given user couldn't be created} reply 
 */
const handleUserCreation = (req, reply) => {

    const { username, userPassword } = req.body

    fetchUserCollection(req.app).then((coll) => {

        checkForUserWithUsername(coll, username).then((usernameExists) => {
            if(usernameExists) {
                let obj = { ...statusResponse };
                obj.statusMessage = "Account with the given username already exists";
                return reply.code(400).send(obj);
            }

            createUser(coll, username, userPassword).then(() => {

                fetchUserFromCollection(coll, username, userPassword).then((user) => {
                    let userExists = user != null;
                    if(!userExists) {
                        let obj = { ...statusResponse };
                        obj.statusMessage = "Server error; account cannot be created";
                        return reply.code(500).send(obj);
                    }
                    else {
                        let obj = { ...statusResponse };
                        obj.statusMessage = "Account successfully created";
                        return reply.code(201).send(obj);
                    }
                })
            })  
        })
    })
}

/**
 * Encapsulates the logic for fetching the user collection
 * @param {*The fastify server instance} app 
 * @returns The collection used to store and fetch users
 */
async function fetchUserCollection(app)
{
    await app.ready()
    let db = app.mongo.client.db(usersDatabaseName);
    let coll = db.collection(usersCollectionName);
    return coll;
}

/**
 * 
 * @param {*The collection to search for users with the given username} coll 
 * @param {*The username being searched for} username 
 * @returns Whether a user with the given username already exists
 */
async function checkForUserWithUsername(coll, username) {

    const query = { username: username };

    let result = await coll.findOne(query);

    return result != null;
}

/**
 * Fetches a user from the given collection
 * @param {*The collection to search for, and fetch the given user from} coll 
 * @param {*The username of the user being searched for} username 
 * @param {*The password of the user being searched for} userPassword 
 * @returns The user
 */
async function fetchUserFromCollection(coll, username, userPassword) {

    const query = { username: username, userPassword: userPassword };

    const options = {
        projection: { _id: 0, username: 1, userPassword: 1, factories: 1 }
    };
      
    const result = await coll.findOne(query, options);

    return result;
}

/**
 * Creates a user, inserting it in the given collection in the process; returns whether the user already existed in the doc, or was newly created as a result of calling the function
 * @param {The collection to place the newly created user in} coll 
 * @param {*The name of the user being created} username 
 * @param {*The password of the user being created} userPassword 
 */
async function createUser(coll, username, userPassword) {
    const response = await fetchUserFromCollection(coll, username, userPassword);
    let userExists = response != null;

    // create user
    if(!userExists) {
        let doc = { 
            username: username, 
            userPassword: userPassword,
            factories: [
                {
                    name: "inserter",
                    URPS: 100,
                    CURPS: 200
                }
            ]
        }
        await coll.insertOne(doc);
    }
}

module.exports = {
    handleUserAccess,
    handleUserCreation
}