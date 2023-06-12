const { Exercise } = require('../models/Exercise');
const { Controller } = require('../structures/Controller');

class ExercisesController extends Controller {
    /**
     * Get all exercises, or search by name, description, body part, or muscle.
     * @endpoint GET `/exercises`
     * @param {import('express').Request<any, any, { query?: string; }>} req
     * @param {import('express').Response} res
     */
    async getExercises(req, res) {
        // TODO: Implement caching and pagination, or would that be overkill?
        let { query } = req.query;
        query = query && String.prototype.toString.call(query) === query
            ? query.trim()
            : null;

        const exercises = query && query.length > 0
            ? await Exercise.find({ $text: { $search: query } })
            : await Exercise.find();

        return this.success(res, { exercises: exercises.map(exercise => exercise.toJSON()) });
    }

    /**
     * Create a brand new exercise.
     * @endpoint PUT `/exercises`
     * @param {import('express').Request<any, any, { query: string; }>} req
     * @param {import('express').Response} res
     */
    async createExercise(req, res) {
        const { name, bodyPart, imageUrl, muscles, description } = req.body;

        // Calling toString like so prevents prototype pollution attacks
        if (!name || String.prototype.toString.call(name) !== name)
            return this.error(res, 400, 'Missing or invalid name');
        if (!description || String.prototype.toString.call(description) !== description)
            return this.error(res, 400, 'Missing or invalid description');
        if (!bodyPart || String.prototype.toString.call(bodyPart) !== bodyPart)
            return this.error(res, 400, 'Missing or invalid body part');
        if (!imageUrl || String.prototype.toString.call(imageUrl) !== imageUrl)
            return this.error(res, 400, 'Missing or invalid image URL');
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