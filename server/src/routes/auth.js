const { Router } = require('express');
const { AuthenticationController } = require('../controller/Authentication');
const { useToken } = require('../middleware/useToken');

// Routes for '/auth'
function authRoutes(server) {
    const router = Router();
    const controller = new AuthenticationController(server);

    router.post('/auth/register', controller.accountRegister.bind(controller));
    router.post('/auth/login', controller.accountLogin.bind(controller));
    router.get('/auth/me', useToken, controller.accountMe.bind(controller));

    return router;
}

module.exports = { authRoutes };