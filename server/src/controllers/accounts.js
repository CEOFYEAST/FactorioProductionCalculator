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

    queryAccount(req.app, username).then((userExists) => {
        if(!userExists) {
            let replyObj = { ...statusResponse };
            replyObj.statusMessage = "Account with the given username does not exist";
            req.session.authenticated = false;
            return reply.code(403).send(replyObj);
        }

        authenticateAccount(req.app, username, userPassword).then((userAuthenticated) => {
            if(!userAuthenticated){
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

    queryAccount(req.app, username).then((userExists) => {
        if(usernameExists) {
            let obj = { ...statusResponse };
            obj.statusMessage = "Account with the given username already exists";
            return reply.code(400).send(obj);
        }

        createAccount(req.app, username, userPassword).then((success) => {
            if(!success) {
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
}

module.exports = {
    handleUserAccess,
    handleUserCreation
}