const jwt = require('jsonwebtoken');
const brypt = require('bcrypt');
const Token = process.env['JWT_TOKEN'];

/**
 * Hash a password.
 * @param {string} password 
 * @returns The hashed password.
 */
function hashPassword(password) {
    return brypt.hashSync(password, 10);
}

/**
 * Validate a password against a hash.
 * @param {string} password 
 * @param {string} hash 
 * @returns Boolean indicating if the password is valid.
 */
function comparePassword(password, hash) {
    return brypt.compareSync(password, hash);
}

/**
 * Create a new authorisation token for a user.
 * @param {import('../models/User').User} user The user to create a token for.
 * @returns The token.
 */
function createToken(user) {
    return jwt.sign(user.id, Token);
}

// TODO: Create a middleware to verify tokens

/**
 * Verify the validity of a token.
 * @param {string} token The token to verify.
 * @returns User ID if valid, null if invalid.
 */
function verifyToken(token) {
    try {
        const id = jwt.verify(token, process.env['JWT_SECRET']);
        return id.payload;
    } catch {
        return null;
    }
}

module.exports = {
    hashPassword,
    comparePassword,
    createToken,
    verifyToken
};
