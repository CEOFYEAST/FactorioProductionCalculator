const queryAccount = require('../scripts/queryAccount')
const createAccount = require('../scripts/createAccount')
const authenticateAccount = require('../scripts/authenticateAccount')
const hashPassword = require('../scripts/hashPassword')

let statusResponse = { statusMessage: "Server error" };
let statusAndDataResponse = { statusMessage: "Server error", username: "" };

/**
 * Handles the overall process of accessing a user account, including the response
 * @param {*The initial access request} req 
 * @param {*The response, including the user account accessed, or an error code if the given user couldn't be found} reply 
 */
const handleUserAccess = (req, reply) => {
    const { username, userPassword } = req.body

    queryAccount(req.app, username).then((userExists) => {
        if(!userExists) {
            let replyObj = { ...statusResponse };
            replyObj.statusMessage = "Account with the given username does not exist";
            req.session.authenticated = false;
            return reply.code(404).send(replyObj);
        }

        authenticateAccount(req.app, username, userPassword).then((userAuthenticated) => {
            if(!userAuthenticated){
                let replyObj = { ...statusResponse };
                replyObj.statusMessage = "Incorrect password";
                req.session.authenticated = false;
                return reply.code(403).send(replyObj);
            }
            else {
                let replyObj = { ...statusAndDataResponse };
                replyObj.statusMessage = "Account successfully accessed";
                replyObj.username = username;
                req.session.authenticated = true;
                req.session.username = username;
                return reply.code(200).send(replyObj);
            }
        });
    })
}

/**
 * Handles the overall process of creating a user account, including the response
 * @param {*The initial user creation request} req 
 * @param {*The response, including the user account created, or an error code if the given user couldn't be created} reply 
 */
const handleUserCreation = (req, reply) => {
    const { username, userPassword } = req.body

    // Check username length
    if (username.length < 6 || username.length > 32) {
        let obj = { ...statusResponse };
        obj.statusMessage = "Username must be between 6 and 32 characters";
        return reply.code(400).send(obj);
    }

    // Check password length
    if (userPassword.length < 8 || userPassword.length > 32) {
        let obj = { ...statusResponse };
        obj.statusMessage = "Password must be between 8 and 32 characters";
        return reply.code(400).send(obj);
    }

    hashPassword(userPassword).then((passwordHash) => {

        //REMOVE
        console.log("Hash: ", passwordHash)

        queryAccount(req.app, username).then((userExists) => {
            if(userExists) {
                let obj = { ...statusResponse };
                obj.statusMessage = "Account with the given username already exists";
                return reply.code(400).send(obj);
            }

            createAccount(req.app, username, passwordHash).then(() => {

                queryAccount(req.app, username).then((creationSuccess) => {
                    if(!creationSuccess) {
                        let obj = { ...statusResponse };
                        obj.statusMessage = "Server error; account was not created";
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

const handleUserLogout = (req, reply) => {
    if(!(req.session) || !(req.session.sessionId))
    {
        let obj = { ...statusResponse };
        obj.statusMessage = "User has no session";
        return reply.code(400).send(obj);
    }

    try {
        req.session.destroy((sessionWasDestroyed) => {
            let statusMessage = "No session was destroyed"
            if(sessionWasDestroyed)
            {
                statusMessage = "User session was successfully destroyed"
            }
            const obj = { ...statusResponse };
            obj.statusMessage = statusMessage;
            return reply.code(200).send(obj);
        })
    } catch(err) {
        console.log(err.message)
        let obj = { ...statusResponse };
        obj.statusMessage = "Server error occurred when attempting to destroy user session";
        return reply.code(500).send(obj);
    }
}

module.exports = {
    handleUserAccess,
    handleUserCreation,
    handleUserLogout
}