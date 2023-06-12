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

    /**
     * earthquake up in heres
     * @param {import('express').Request<any, any, { query: string; }>} req
     * @param {import('express').Response} res
     */
    async createExercise(req, res) {
        const { name, bodyPart, imageUrl, muscles, description } = req.body;

        if (!name || !bodyPart || !imageUrl || !muscles || !description)
            return this.error(res, 400, 'Missing required fields');
        if (!Array.isArray(muscles) || muscles.length === 0)
            return this.error(res, 400, 'Muscles must be an array with at least one muscle');

        const exercise = await Exercise.create({
            creator: req.user.id,
            name, description,
            bodyPart, imageUrl, muscles,
        })
            .catch(err => {
                // In theory, this should never error, but just in case
                console.error(err);
                return null;
            });

        if (!exercise)
            return this.error(res, 500, 'Failed to create exercise');

        return this.success(res, exercise.toJSON());
    }
}

module.exports = { ExercisesController };