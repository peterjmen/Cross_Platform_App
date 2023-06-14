const { Router } = require('express');
const { UsersController } = require('../controller/Users');
const { useToken } = require('../middleware/useToken');

// Routes for '/exercise'
function usersRoutes(server) {
    const router = Router();
    const controller = new UsersController(server);

    router.put('/users', controller.createUser.bind(controller));
    router.post('/users', controller.loginUser.bind(controller));
    router.get('/users/@me', useToken, controller.getCurrentUser.bind(controller));
    router.patch('/users/@me', useToken, controller.updateCurrentUser.bind(controller));
    router.delete('/users/@me', useToken, controller.deleteCurrentUser.bind(controller));

    return router;
}

module.exports = { usersRoutes };
