const { Exercise } = require('../models/Exercise');
const { Controller } = require('../structures/Controller');

class ExercisesController extends Controller {
    /**
     * Search for exercises by name, description, body part, or muscle.
     * @param {import('express').Request<any, any, { query: string; }>} req
     * @param {import('express').Response} res
     */
    async searchExercises(req, res) {
        const { query } = req.query;

        // TODO: Implement caching and pagination, or would that be overkill?

        // Calling toString like so prevents prototype pollution attacks
        if (!query || String.prototype.toString.call(query) !== query)
            return this.error(res, 400, 'Invalid query');

        const exercises = await Exercise.find({ $text: { $search: query } });
        return this.success(res, { exercises: exercises.map(exercise => exercise.toJSON()) });
    }
}

module.exports = { ExercisesController };