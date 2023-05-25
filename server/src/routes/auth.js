const { Router } = require('express');
const { AuthenticationController } = require('../controller/Authentication');

// Routes for '/auth'
function authRoutes(server) {
    const router = Router();
    const controller = new AuthenticationController(server);

    router.post('/auth/register', controller.accountRegister.bind(controller));
    router.post('/auth/login', controller.accountLogin.bind(controller));

    return router;
}

module.exports = { authRoutes };