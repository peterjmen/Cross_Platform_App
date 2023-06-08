const { User } = require('../models/User');
const { verifyToken } = require('../utilities/crypto');

/**
 * Middleware function to check if the request has a valid token.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function useToken(req, res, next) {
    if (req.user) return next();

    const token = req.header('authorization');
    const payload = token ? verifyToken(token) : null;

    if (!payload) return res.status(401).json({
        success: false,
        details: 'You must be logged in to do that'
    });

    if (payload.exp < Date.now() / 1000) return res.status(401).json({
        success: false,
        details: 'Your session has expired, please log in again'
    });

    const user = await User.findById(payload.uid);
    if (!user) return res.status(401).json({
        success: false,
        details: 'You must be logged in to do that'
    });

    req.user = user;
    next();
}

module.exports = { useToken };