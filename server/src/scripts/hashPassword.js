const argon2 = require('argon2');

async function hashPassword(password) {
  try {
    const hash = await argon2.hash(password, { 
        type: argon2.argon2id,
        timeCost: 2,
        memoryCost: 19456,
        paralellism: 1
    });
    return hash;
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = hashPassword