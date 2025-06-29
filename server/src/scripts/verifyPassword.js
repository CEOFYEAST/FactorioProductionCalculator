const argon2 = require('argon2');

async function verifyPassword(hash, password) {
    try {
        const isMatch = await argon2.verify(hash, password);
        return isMatch
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = verifyPassword