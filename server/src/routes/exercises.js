const { Router } = require('express');
const { ExercisesController } = require('../controller/Exercises');
const { useToken } = require('../middleware/useToken');

// Routes for '/exercise'
function exercisesRoutes(server) {
    const router = Router();
    const controller = new ExercisesController(server);

    router.get('/exercises', controller.getExercises.bind(controller));
    router.put('/exercises', useToken, controller.createExercise.bind(controller));

    return router;
}

module.exports = { exercisesRoutes };
