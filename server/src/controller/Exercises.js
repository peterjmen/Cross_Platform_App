const { isValidObjectId } = require('mongoose');
const { Exercise } = require('../models/Exercise');
const { Controller } = require('../structures/Controller');

const isNullish = v => v === null || v === undefined;

class ExercisesController extends Controller {
    /**
     * Get all exercises, or search by name, description, body part, or muscle.
     * @endpoint GET `/exercises`
     * @param {import('express').Request<any, any, { query?: string; }>} req
     * @param {import('express').Response} res
     */
    async getExercises(req, res) {
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
     * @param {import('express').Request<any, any, { name: string; description: string; bodyPart: string; imageUrl: string; muscles: string[] }>} req
     * @param {import('express').Response} res
     */
    async createExercise(req, res) {
        const { name, description, bodyPart, imageUrl, muscles } = req.body;

        if (isNullish(name)) return this.error(res, 400, 'Name is required');
        if (typeof name !== 'string' || name.length === 0)
            return this.error(res, 400, 'Provided name is invalid');

        if (isNullish(description)) return this.error(res, 400, 'Description is required');
        if (typeof description !== 'string' || description.length === 0)
            return this.error(res, 400, 'Provided description is invalid');

        if (isNullish(bodyPart)) return this.error(res, 400, 'Body part is required');
        if (typeof bodyPart !== 'string' || bodyPart.length === 0)
            return this.error(res, 400, 'Provided body part is invalid');

        if (isNullish(imageUrl)) return this.error(res, 400, 'Image URL is required');
        if (typeof imageUrl !== 'string' || imageUrl.length < 10)
            return this.error(res, 400, 'Provided image URL is invalid');

        if (isNullish(muscles)) return this.error(res, 400, 'Muscles are required');
        if (!Array.isArray(muscles) || muscles.length === 0)
            return this.error(res, 400, 'Provided muscles are invalid');

        return Exercise.create({
            creator: req.user.id,
            name, description,
            bodyPart, imageUrl, muscles,
        })
            .then(exercise => this.success(res, exercise.toJSON(), 201))
            .catch(() => this.error(res, 500, 'Failed to create exercise'));
    }

    /**
     * Get an existing exercise by its ID.
     * @endpoint GET `/exercises/:id`
     * @param {import('express').Request<{ id: string; }>} req
     * @param {import('express').Response} res
     */
    async getExercise(req, res) {
        const { id } = req.params;

        const exercise = isValidObjectId(id) && await Exercise.findById(id);
        if (!exercise) return this.error(res, 404, 'Exercise not found');
        return this.success(res, exercise.toJSON());
    }

    /**
     * Update an existing exercise.
     * @endpoint PATCH `/exercises/:id`
     * @param {import('express').Request<{ id: string; }, any, Partial<{ name: string; description: string; bodyPart: string; imageUrl: string; muscles: string[] }>>} req
     * @param {import('express').Response} res
     */
    async updateExercise(req, res) {
        const { id } = req.params;

        const exercise = isValidObjectId(id) && await Exercise.findById(id);
        if (!exercise) return this.error(res, 404, 'Exercise not found');

        // All exercises are public so no real need to worry about information leaking
        if (!exercise.creator.equals(req.user.id))
            return this.error(res, 403, 'You do not have permission to edit this exercise');

        const { name, description, bodyPart, imageUrl, muscles } = req.body;

        if (!isNullish(name) && (typeof name !== 'string' || name.length === 0))
            return this.error(res, 400, 'Provided name is invalid');
        if (!isNullish(name)) exercise.name = name;

        if (!isNullish(description) && (typeof description !== 'string' || description.length === 0))
            return this.error(res, 400, 'Provided description is invalid');
        if (description) exercise.description = description;

        if (!isNullish(bodyPart) && (typeof bodyPart !== 'string' || bodyPart.length === 0))
            return this.error(res, 400, 'Provided body part is invalid');
        if (!isNullish(bodyPart)) exercise.bodyPart = bodyPart;

        if (!isNullish(imageUrl) && (typeof imageUrl !== 'string' || imageUrl.length < 10))
            return this.error(res, 400, 'Provided image URL is invalid');
        if (!isNullish(imageUrl)) exercise.imageUrl = imageUrl;

        if (!isNullish(muscles) && (!Array.isArray(muscles) || muscles.length === 0))
            return this.error(res, 400, 'Provided muscles are invalid');
        if (!isNullish(muscles)) exercise.muscles = muscles;

        if (exercise.isModified()) {
            const result = await exercise.save().catch(() => null);
            if (!result) return this.error(res, 500, 'Failed to update exercise');
        }

        return this.success(res, exercise.toJSON(), 201);
    }

    /**
     * Delete an existing exercise.
     * @endpoint DELETE `/exercises/:id`
     * @param {import('express').Request<{ id: string; }>} req
     * @param {import('express').Response} res
     */
    async deleteExercise(req, res) {
        const { id } = req.params;

        const exercise = isValidObjectId(id) && await Exercise.findById(id);
        if (!exercise) return this.error(res, 404, 'Exercise not found');

        if (!exercise.creator.equals(req.user.id))
            return this.error(res, 403, 'You do not have permission to edit this exercise');

        return exercise.deleteOne()
            .then(() => this.success(res, {}))
            .catch(() => this.error(res, 500, 'Failed to delete exercise'));
    }
}

module.exports = { ExercisesController };