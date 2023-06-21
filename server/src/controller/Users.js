const { User } = require('../models/User');
const { Controller } = require('../structures/Controller');
const { createToken, comparePassword } = require('../utilities/crypto');

const isNullish = v => v === null || v === undefined;
const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

class UsersController extends Controller {
    /**
     * Creates a new user with a name, email and password.
     * @endpoint PUT `/users`
     * @param {import('express').Request<any, any, { name: string; email: string; password: string; }>} req
     * @param {import('express').Response} res
     */
    async createUser(req, res) {
        const { name, email, password } = req.body;

        if (isNullish(name)) return this.error(res, 400, 'Name is required');
        if (typeof name !== 'string') return this.error(res, 400, 'Provided name is invalid');

        if (isNullish(email)) return this.error(res, 400, 'Email address is required');
        if (typeof email !== 'string' || !EmailRegex.test(email))
            return this.error(res, 400, 'Provided email address is invalid');

        if (isNullish(password)) return this.error(res, 400, 'Password is required');
        if (typeof password !== 'string' || !PasswordRegex.test(password))
            return this.error(res, 400, 'Password must be at least 8 characters long, contain at least one letter and one number');

        const existing = await User.findOne({ email });
        if (existing) return this.error(res, 400, 'Provided email address is invalid');

        // Password is automatically hashed before being saved, refer to the models/User.js file
        const user = await User.create({ name, email, password });

        const token = createToken(user);
        return this.success(res, { ...user.toJSON(), token });
    }

    /**
     * Logs in a user with an email and password.
     * @endpoint POST `/users`
     * @param {import('express').Request<any, any, { email: string; password: string; }>} req
     * @param {import('express').Response} res
     */
    async loginUser(req, res) {
        // Most errors are the same to prevent information leaking
        const { email, password } = req.body;

        if (isNullish(email)) return this.error(res, 400, 'Email address is required');
        if (typeof email !== 'string' || !EmailRegex.test(email))
            return this.error(res, 400, 'Email or password was incorrect');

        if (isNullish(password)) return this.error(res, 400, 'Password is required');
        if (typeof password !== 'string' || !PasswordRegex.test(password))
            return this.error(res, 400, 'Email or password was incorrect');

        const existing = await User.findOne({ email });
        if (!existing) return this.error(res, 400, 'Email or password was incorrect');

        const isCorrect = comparePassword(password, existing.password);
        if (!isCorrect) return this.error(res, 400, 'Email or password was incorrect');

        const token = createToken(existing);
        return this.success(res, { ...existing.toJSON(), token });
    }

    /**
     * Gets the user that is logged in.
     * @endpoint GET `/users/@me`
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async getCurrentUser(req, res) {
        return this.success(res, req.user.toJSON());
    }

    /**
     * Logs in a user with an email and password.
     * @endpoint PATCH `/users/@me`
     * @param {import('express').Request<any, any, { name: string; email: string; password: string; }>} req
     * @param {import('express').Response} res
     */
    async updateCurrentUser(req, res) {
        const user = req.user;
        const { name, email, password } = req.body;

        if (!isNullish(name) && (typeof name !== 'string' || name.length === 0))
            return this.error(res, 400, 'Provided name was invalid');
        if (!isNullish(name)) user.name = name;

        if (!isNullish(email) && (typeof email !== 'string' || !EmailRegex.test(email)))
            return this.error(res, 400, 'Provided email was invalid');
        if (!isNullish(email)) {
            const existing = await User.findOne({ email, _id: { $ne: req.user.id } });
            if (existing) return this.error(res, 400, 'Provided email was invalid');
            user.email = email;
        }

        if (!isNullish(password) && (typeof password !== 'string' || !PasswordRegex.test(password)))
            return this.error(res, 400, 'Provided password was invalid');
        if (!isNullish(password)) user.password = password;

        if (user.isModified()) {
            const result = await user.save().catch(() => null);
            if (!result) return this.error(res, 500, 'Failed to update user');
        }

        return this.success(res, user.toJSON(), 201);
    }

    /**
     * Deletes the user that is logged in.
     * @endpoint DELETE `/users/@me`
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async deleteCurrentUser(req, res) {
        return req.user.deleteOne()
            .then(() => this.success(res, {}))
            .catch(() => this.error(res, 500, 'Failed to delete user'));
    }
}

module.exports = { UsersController };