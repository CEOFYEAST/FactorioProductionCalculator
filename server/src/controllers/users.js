app = require("../server.js");

const usersDatabaseName = "sample_users";
const usersCollectionName = "users";

/**
 * Handles the overall process of accessing a user account, including the response
 * @param {*The initial access request} req 
 * @param {*The response, including the user account accessed, or an error code if the given user couldn't be found} reply 
 */
const handleUserAccess = (req, reply) => {
    const { userName, userPassword } = req.body

    let db = app.mongo.client.db(usersDatabaseName);
    let coll = db.collection(usersCollectionName)
    checkForUser(coll, userName, userPassword).then((response) => {
        let userExists = response != null;
        if(!userExists) reply.code(500).send("User POST Failed");
        else reply.code(201).send(response);
    })
}

/**
 * Handles the overall process of creating a user account, including the response
 * @param {*The initial user creation request} req 
 * @param {*The response, including the user account created, or an error code if the given user couldn't be created} reply 
 */
const handleUserCreation = (req, reply) => {
    const { userName, userPassword } = req.body
    let coll = fetchUserCollection();
    createUser(coll, userName, userPassword).then(() => {
        respondWithUser(coll, userName, userPassword, reply);
    })  
}

/**
 * Creates a user, inserting it in the given collection in the process; returns whether the user already existed in the doc, or was newly created as a result of calling the function
 * @param {The collection to place the newly created user in} coll 
 * @param {*The name of the user being created} userName 
 * @param {*The password of the user being created} userPassword 
 * @returns Whether a user with the given information already exists within the given collection
 */
async function createUser(coll, userName, userPassword) {
    fetchUser(coll, userName, userPassword).then((response) => {
        let userExists = response != null;
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
            return false;
        } else return true;
    })
}

/**
 * Sends a response using the given reply object and user information
 * - The user information is required as opposed to an object so that the user's existance can first be verified
 * @param {*The collection to fetch the given user from} coll 
 * @param {*The user name of the user to respond with} userName 
 * @param {*The password of the user to respond with} userPassword 
 * @param {*The reply object used to return the user to the requester} reply 
 */
async function replyWithUser(coll, userName, userPassword, reply) {
    fetchUser(coll, userName, userPassword).then((response) => {
        let userExists = response != null;
        if(!userExists) reply.code(500).send("User POST Failed");
        else reply.code(201).send(response);
    })
}

/**
 * Fetches a user from the given collection
 * @param {*The collection to search for, and fetch the given user from} coll 
 * @param {*The user name of the user being searched for} userName 
 * @param {*The password of the user being searched for} userPassword 
 * @returns The user
 */
async function fetchUser(coll, userName, userPassword) {

    // Query for a movie that has the title 'The Room'
    const query = { userName: userName, userPassword: userPassword };

    const options = {
        projection: { _id: 0, userName: 1, userPassword: 1, factories: 1 }
    };
      
    const result = await coll.findOne(query, options);

    return result;
}

/**
 * Encapsulates the logic for fetching the user collection
 * @returns The collection used to store and fetch users
 */
function fetchUserCollection()
{
    let db = app.mongo.client.db(usersDatabaseName);
    let coll = db.collection(usersCollectionName);
    return coll;
}

module.exports = {
    handleAccessUser,
    handleCreateUser
}