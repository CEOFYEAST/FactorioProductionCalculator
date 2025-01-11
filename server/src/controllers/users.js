const usersDatabaseName = "sample_users";
const usersCollectionName = "users";

/**
 * Handles the overall process of accessing a user account, including the response
 * @param {*The initial access request} req 
 * @param {*The response, including the user account accessed, or an error code if the given user couldn't be found} reply 
 */
const handleUserAccess = (req, reply) => {
    const { userName, userPassword } = req.body
    fetchUserCollection(req.app).then((coll) => {
        fetchUserFromCollection(coll, userName, userPassword).then((user) => {
            let userExists = user != null;
            if(!userExists) reply.code(500);
            else reply.code(200).send(user);
        });
    })
}

/**
 * Handles the overall process of creating a user account, including the response
 * @param {*The initial user creation request} req 
 * @param {*The response, including the user account created, or an error code if the given user couldn't be created} reply 
 */
const handleUserCreation = (req, reply) => {
    const { userName, userPassword } = req.body
    fetchUserCollection(req.app).then((coll) => {
        createUser(coll, userName, userPassword).then((userCreated) => {
            fetchUserFromCollection(coll, userName, userPassword).then((user) => {
                let userExists = user != null;
                if(!userExists) reply.code(500);
                else if(!userCreated) reply.code(200);
                else reply.code(201);
            })
            
        })  
    })
}

/**
 * Creates a user, inserting it in the given collection in the process; returns whether the user already existed in the doc, or was newly created as a result of calling the function
 * @param {The collection to place the newly created user in} coll 
 * @param {*The name of the user being created} userName 
 * @param {*The password of the user being created} userPassword 
 * @returns Whether a user was actually created as a result of the function (a user account won't be recreated if it already exists)
 */
async function createUser(coll, userName, userPassword) {
    const response = await fetchUserFromCollection(coll, userName, userPassword);
    let userExists = response != null;

    // create user
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
        await coll.insertOne(doc);
        return true;
    }
    
    // user already existed, so no creation was neccessary
    return false;
}

/**
 * Fetches a user from the given collection
 * @param {*The collection to search for, and fetch the given user from} coll 
 * @param {*The user name of the user being searched for} userName 
 * @param {*The password of the user being searched for} userPassword 
 * @returns The user
 */
async function fetchUserFromCollection(coll, userName, userPassword) {

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

module.exports = {
    handleUserAccess,
    handleUserCreation
}