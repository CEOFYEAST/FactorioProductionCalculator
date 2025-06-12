const jsw = require("jsonwebtoken")
const secret = process.env["COOKIE_SIG"]

const createToken = async (username, expirationDate) => {
    const methodName = 'createToken'
    return new Promise((resolve, reject) => {
        jsw.sign(
            { username: username },
            secret,
            { expiresIn: expirationDate, algorithm: 'HS256' },
            (err, token) => {
                if (err) {
                    reject(new Error(`Method ${methodName} failed with error: ${err.message}`));
                } else {
                    resolve(token);
                }
            }
        );
    });
}

module.exports = createToken