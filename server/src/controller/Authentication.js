const { User } = require('../models/User');
const { Controller } = require('../structures/Controller');
const { createToken, hashPassword, comparePassword } = require('../utilities/crypto');

const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

/**
 * Controller for authentication, such as logging in and registering.
 */
class AuthenticationController extends Controller {
    /**
     * Creates a new user with an email and password.
     * @param {import('express').Request<any, any, { name: string; email: string; password: string; }>} req
     * @param {import('express').Response} res
     */
    async accountRegister(req, res) {
        const { name, email, password } = req.body;

        if (!name || !email || !password)
            return this.error(res, 400, 'Missing name, email or password');

        if (typeof email !== 'string' || !EmailRegex.test(email))
            return this.error(res, 400, 'Provided email was invalid');
        if (typeof password !== 'string' || !PasswordRegex.test(password))
            return this.error(res, 400, 'Password must be at least 8 characters long, contain at least one letter and one number');

        const existing = await User.findOne({ email });
        if (existing)
            return this.error(res, 400, 'An account with that email already exists');

        const hashedPassword = hashPassword(password);
        const user = await User.create({ name, email, password: hashedPassword });

        const token = createToken(user);
        return this.success(res, { ...user.toJSON(), token });
    }

    /**
     * Logs in a user with an email and password.
     * @param {import('express').Request<any, any, { email: string; password: string; }>} req
     * @param {import('express').Response} res
     */
    async accountLogin(req, res) {
        const { email, password } = req.body;

        if (!email || !password)
            return this.error(res, 400, 'Missing email or password');

        // All errors are the same to prevent information leaking
        // Might as well check if the email and password are valid, prevents unnecessary database queries
        if (typeof email !== 'string' || !EmailRegex.test(email))
            return this.error(res, 400, 'Email or password was incorrect');
        if (typeof password !== 'string' || !PasswordRegex.test(password))
            return this.error(res, 400, 'Email or password was incorrect');

        const user = await User.findOne({ email });
        if (!user)
            return this.error(res, 400, 'Email or password was incorrect');

        const isCorrect = comparePassword(password, user.password);
        if (!isCorrect)
            return this.error(res, 400, 'Email or password was incorrect');

        const token = createToken(user);
        return this.success(res, { ...user.toJSON(), token });
    }

    /**
     * Gets the currently logged in user.
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async accountMe(req, res) {
        return this.success(res, req.user.toJSON());
    }
}

module.exports = { AuthenticationController };
