const jsw = require("jsonwebtoken")
const secret = process.env["COOKIE_SIG"]

const decryptToken = async (token) => {
    const methodName = 'decryptToken'
    if (token.startsWith('Bearer ')) {
        token = token.slice(7)
    }
    const decoded = await jsw.verify(token, secret, function(err, token) {
        if(err){
            throw new Error(`Method ${methodName} failed with error: ${err.message}`)
        }
        return token
    });
    return decoded
}

module.exports = decryptToken