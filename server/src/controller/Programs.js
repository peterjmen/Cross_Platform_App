const { Controller } = require("../structures/Controller");
const { Program } = require('../models/Program');
const { isValidObjectId } = require("mongoose");
const { Exercise } = require("../models/Exercise");

class ProgramsController extends Controller {
    /**
     * Get all programs, or search by name, description, body part, or muscle.
     * @endpoint GET `/programs`
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async getPrograms(req, res) {
        let { query } = req.query;
        query = typeof query === 'string'
            ? query.trim()
            : null;

        const programs = query && query.length > 0
            ? await Program.find({ $text: { $search: query } })
            : await Program.find();

        return this.success(res, { programs: programs.map(program => program.toJSON()) });
    }

    /**
     * Create a brand new program.
     * @endpoint PUT `/programs`
     * @param {import('express').Request<any, any, { name: string; description: string; exercises: string[]; sets: number; repetitions: number; rest: number; frequency: string; }>} req
     * @param {import('express').Response} res
     */
    async createProgram(req, res) {
        let { name, description, exercises: exerciseIds, sets, repetitions, rest, frequency } = req.body;
        exerciseIds = exerciseIds.filter((v, i, a) => a.indexOf(v) === i && isValidObjectId(v));

        if (typeof name !== 'string' || name.length === 0)
            return this.error(res, 400, 'Missing or invalid name');
        if (description && (typeof description !== 'string' || description.length === 0))
            return this.error(res, 400, 'Missing or invalid description');
        if (!Array.isArray(exerciseIds) || exerciseIds.length === 0)
            return this.error(res, 400, 'Exercises must have at least one exercise');
        if (typeof sets !== 'number' || sets < 1)
            return this.error(res, 400, 'Sets must be a number greater than 0');
        if (typeof repetitions !== 'number' || repetitions < 1)
            return this.error(res, 400, 'Repetitions must be a number greater than 0');
        if (typeof rest !== 'number' || rest < 1)
            return this.error(res, 400, 'Rest must be a number greater than 0');
        if (typeof frequency !== 'string' || frequency.length === 0)
            return this.error(res, 400, 'Missing or invalid frequency');

        const exercises = await Exercise.find({ _id: { $in: exerciseIds } });
        if (exercises.length !== exerciseIds.length)
            return this.error(res, 400, 'Exercises must have at least one exercise');

        return Program.create({
            creator: req.user.id,
            name, description,
            exercises: exercises.map(e => e.id),
            sets, repetitions, rest, frequency,
        })
            .then(program => this.success(res, program.toJSON()))
            .catch(() => this.error(res, 500, 'Failed to create program'));
    }

    /**
     * Get a single program by its ID.
     * @endpoint GET `/programs/:id`
     * @param {import('express').Request<{ id: string; }>} req
     * @param {import('express').Response} res
     */
    async getProgram(req, res) {
        const { id } = req.params;
        if (typeof id !== 'string' || id.length === 0)
            return this.error(res, 400, 'Missing or invalid program ID');

        const program = await Program.findById(id);
        if (!program) return this.error(res, 404, 'Program not found');
        return this.success(res, program.toJSON());
    }

    /**
     * Update an existing program.
     * @endpoint PATCH `/programs/:id`
     * @param {import('express').Request<{ id: string; }, any, Partial<{ name: string; description: string; exercises: string[]; sets: number; repetitions: number; rest: number; frequency: string; }>>} req
     * @param {import('express').Response} res
     */
    async updateProgram(req, res) {
        const { id } = req.params;
        if (typeof id !== 'string' || id.length === 0)
            return this.error(res, 400, 'Missing or invalid program ID');

        const program = await Program.findById(id);
        if (!program) return this.error(res, 404, 'Program not found');
        if (!program.creator.equals(req.user.id))
            return this.error(res, 403, 'You do not have permission to update this program');

        let { name, description, exercises: exerciseIds, sets, repetitions, rest, frequency } = req.body;
        exerciseIds = exerciseIds?.filter((v, i, a) => a.indexOf(v) === i && isValidObjectId(v));

        if (name && typeof name === 'string' && name.length > 0)
            program.name = name;
        if (description && typeof description === 'string' && description.length > 0)
            program.description = description;
        if (exerciseIds && Array.isArray(exerciseIds) && exerciseIds.length > 0) {
            const exercises = await Exercise.find({ _id: { $in: exerciseIds } });
            if (exercises.length === exerciseIds.length)
                program.exercises = exercises.map(e => e.id);
        }
        if (sets && typeof sets === 'number' && sets > 0)
            program.sets = sets;
        if (repetitions && typeof repetitions === 'number' && repetitions > 0)
            program.repetitions = repetitions;
        if (rest && typeof rest === 'number' && rest > 0)
            program.rest = rest;
        if (frequency && typeof frequency === 'string' && frequency.length > 0)
            program.frequency = frequency;

        const hasBeenModified = program.isModified();
        if (hasBeenModified) {
            const result = await program.save().catch(err => {
                console.error(err);
                return null;
            });

            if (result === null)
                return this.error(res, 500, 'Failed to update program');
        }

        return this.success(res, program.toJSON());
    }

    /**
     * Delete an existing program.
     * @endpoint DELETE `/programs/:id`
     * @param {import('express').Request<{ id: string; }>} req
     * @param {import('express').Response} res
     */
    async deleteProgram(req, res) {
        const { id } = req.params;
        if (typeof id !== 'string' || id.length === 0)
            return this.error(res, 400, 'Missing or invalid program ID');

        const program = await Program.findById(id);
        if (!program) return this.error(res, 404, 'Program not found');
        if (!program.creator.equals(req.user.id))
            return this.error(res, 403, 'You do not have permission to delete this program');

        return program.deleteOne()
            .then(() => this.success(res, {}))
            .catch(() => this.error(res, 500, 'Failed to delete program'));
    }
}

module.exports = { ProgramsController };
