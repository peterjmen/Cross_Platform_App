const { Router } = require('express');
const { ProgramsController } = require('../controller/Programs');
const { useToken } = require('../middleware/useToken');

// Routes for '/programs'
function programsRoutes(server) {
    const router = Router();
    const controller = new ProgramsController(server);

    router.get('/programs', controller.getPrograms.bind(controller));
    router.put('/programs', useToken, controller.createProgram.bind(controller));
    router.get('/programs/:id', controller.getProgram.bind(controller));
    router.patch('/programs/:id', useToken, controller.updateProgram.bind(controller));
    router.delete('/programs/:id', useToken, controller.deleteProgram.bind(controller));

    return router;
}

module.exports = { programsRoutes };
