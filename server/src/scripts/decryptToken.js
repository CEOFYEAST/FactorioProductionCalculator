const jsw = require("jsonwebtoken")
const secret = process.env["COOKIE_SIG"]

const decryptToken = async (token) => {
    const methodName = 'decryptToken'
    const decoded = await jsw.verify(token, secret, function(err, token) {
        if(err){
            throw new Error(`Method ${methodName} failed with error: ${err.message}`)
        }
        return token
    });
    console.log("Decoded: ", decoded)
    console.log("Username: ", decoded.username)
    return decoded.username
}

module.exports = decryptToken