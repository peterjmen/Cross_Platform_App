const { User } = require('../models/User');
const { Controller } = require('../structures/Controller');
const { createToken, comparePassword } = require('../utilities/crypto');

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

        if (!name || !email || !password)
            return this.error(res, 400, 'Missing required fields');

        if (typeof email !== 'string' || !EmailRegex.test(email))
            return this.error(res, 400, 'Provided email was invalid');
        if (typeof password !== 'string' || !PasswordRegex.test(password))
            return this.error(res, 400, 'Password must be at least 8 characters long, contain at least one letter and one number');

        const existing = await User.findOne({ email });
        if (existing) return this.error(res, 400, 'Provided email was invalid');

        // Password is hashed before being saved, refer to the models/User.js file
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

        if (name && typeof name === 'string') user.name = name;
        if (email && typeof email === 'string') user.email = email;
        if (password && typeof password === 'string') user.password = password;

        if (user.isModified('email')) {
            const existing = await User.findOne({ email, _id: { $ne: req.user.id } });
            if (existing) return this.error(res, 400, 'Provided email was invalid');
        }

        if (user.isModified()) {
            const result = await user.save()
                .catch(() => null);
            if (!result) return this.error(res, 500, 'Failed to update user');
        }

        return this.success(res, user.toJSON());
    }

    /**
     * Deletes the user that is logged in.
     * @endpoint DELETE `/users/@me`
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async deleteCurrentUser(req, res) {
        const user = req.user;

        const result = await user.deleteOne()
            .catch(() => null);
        if (!result) return this.error(res, 500, 'Failed to delete user');

        return this.success(res, '', 204);
    }
}

module.exports = { UsersController };