const { isValidObjectId } = require('mongoose');
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
        query = typeof query === 'string'
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

        if (typeof name !== 'string' || name.length === 0)
            return this.error(res, 400, 'Missing or invalid name');
        if (typeof description !== 'string' || description.length === 0)
            return this.error(res, 400, 'Missing or invalid description');
        if (typeof bodyPart !== 'string' || bodyPart.length === 0)
            return this.error(res, 400, 'Missing or invalid body part');
        // TODO: Add better validation for image URLs
        if (typeof imageUrl !== 'string' || imageUrl.length < 10)
            return this.error(res, 400, 'Missing or invalid image URL');
        if (!Array.isArray(muscles) || muscles.length === 0)
            return this.error(res, 400, 'Muscles must be an array with at least one muscle');

        return Exercise.create({
            creator: req.user.id,
            name, description,
            bodyPart, imageUrl, muscles,
        })
            .then(exercise => this.success(res, exercise.toJSON(), 201))
            .catch(() => this.error(res, 500, 'Failed to create exercise'));
    }

    /**
     * Get all exercises, or search by name, description, body part, or muscle.
     * @endpoint GET `/exercises/:id`
     * @param {import('express').Request<{ id?: string; }>} req
     * @param {import('express').Response} res
     */
    async getExercise(req, res) {
        const { id } = req.params;
        if (!id || isValidObjectId(id) === false)
            return this.error(res, 400, 'Missing or invalid ID');

        const exercise = await Exercise.findById(id);
        if (exercise) return this.success(res, exercise.toJSON());
        return this.error(res, 404, 'Exercise not found');
    }

    /**
     * Update an existing exercise.
     * @endpoint PATCH `/exercises/:id`
     * @param {import('express').Request<{ id?: string; }>} req
     * @param {import('express').Response} res
     */
    async updateExercise(req, res) {
        const { id } = req.params;
        if (!id || isValidObjectId(id) === false)
            return this.error(res, 400, 'Missing or invalid ID');

        const exercise = await Exercise.findById(id);
        if (!exercise)
            return this.error(res, 404, 'Exercise not found');
        // All exercises are public so no real need to worry about information leaking
        if (!exercise.creator.equals(req.user.id))
            return this.error(res, 403, 'You do not have permission to edit this exercise');

        const { name, bodyPart, imageUrl, muscles, description } = req.body;

        if (name && typeof name === 'string' && name.length > 0)
            exercise.name = name;
        if (description && typeof description === 'string' && description.length > 0)
            exercise.description = description;
        if (bodyPart && typeof bodyPart === 'string' && bodyPart.length > 0)
            exercise.bodyPart = bodyPart;
        if (imageUrl && typeof imageUrl === 'string' && imageUrl.length > 9)
            exercise.imageUrl = imageUrl;
        if (Array.isArray(muscles) && muscles.length > 0)
            exercise.muscles = muscles;

        const hasBeenModified = exercise.isModified();
        if (hasBeenModified) {
            const result = await exercise.save().catch(err => {
                console.error(err);
                return null;
            });

            if (result === null)
                return this.error(res, 500, 'Failed to update exercise');
        }

        return this.success(res, exercise.toJSON());
    }

    /**
     * Delete an existing exercise.
     * @endpoint DELETE `/exercises/:id`
     * @param {import('express').Request<{ id?: string; }>} req
     * @param {import('express').Response} res
     */
    async deleteExercise(req, res) {
        const { id } = req.params;
        if (!id || isValidObjectId(id) === false)
            return this.error(res, 400, 'Missing or invalid ID');

        const exercise = await Exercise.findById(id);
        if (!exercise)
            return this.error(res, 404, 'Exercise not found');
        if (!exercise.creator.equals(req.user.id))
            return this.error(res, 403, 'You do not have permission to edit this exercise');

        return exercise.deleteOne()
            .then(() => this.success(res, '', 204))
            .catch(() => this.error(res, 500, 'Failed to delete exercise'));

    }
}

module.exports = { ExercisesController };