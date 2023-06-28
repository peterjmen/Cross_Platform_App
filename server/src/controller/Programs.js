const { Controller } = require("../structures/Controller");
const { Program } = require('../models/Program');
const { isValidObjectId } = require("mongoose");
const { Exercise } = require("../models/Exercise");

const isNullish = v => v === null || v === undefined;

class ProgramsController extends Controller {
    /**
     * Get all programs, or search by name, description, body part, or muscle.
     * @endpoint GET `/programs`
     * @param {import('express').Request<any, any, any, { query?: string; creator?: string; }>} req
     * @param {import('express').Response} res
     */
    async getPrograms(req, res) {
        let { query, creator } = req.query;

        if (creator && !isValidObjectId(creator))
            return this.error(res, 400, 'Creator query parameter is invalid');

        const finder = Program.find();

        if (typeof query === 'string' && query.length > 0) finder.find({ $text: { $search: query.trim() } });
        if (creator) finder.find({ creator });

        const programs = await finder.exec();

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
        exerciseIds = exerciseIds?.filter((v, i, a) => a.indexOf(v) === i && isValidObjectId(v));

        if (isNullish(name)) return this.error(res, 400, 'Name is required');
        if (typeof name !== 'string' || name.length === 0)
            return this.error(res, 400, 'Provided name is invalid');

        if (isNullish(description)) return this.error(res, 400, 'Description is required');
        if (typeof description !== 'string' || description.length === 0)
            return this.error(res, 400, 'Provided description is invalid');

        if (isNullish(exerciseIds)) return this.error(res, 400, 'Exercises are required');
        if (exerciseIds.some(id => !isValidObjectId(id)))
            return this.error(res, 400, 'Provided exercises are invalid');

        if (isNullish(sets)) return this.error(res, 400, 'Sets are required');
        if (typeof sets !== 'number' || sets < 1)
            return this.error(res, 400, 'Sets must be a number greater than 0');

        if (isNullish(repetitions)) return this.error(res, 400, 'Repetitions are required');
        if (typeof repetitions !== 'number' || repetitions < 1)
            return this.error(res, 400, 'Repetitions must be a number greater than 0');

        if (isNullish(rest)) return this.error(res, 400, 'Rest is required');
        if (typeof rest !== 'number' || rest < 1)
            return this.error(res, 400, 'Rest must be a number greater than 0');

        if (isNullish(frequency)) return this.error(res, 400, 'Frequency is required');
        if (typeof frequency !== 'string' || frequency.length === 0)
            return this.error(res, 400, 'Provided frequency is invalid');

        const exercises = await Exercise.find({ _id: { $in: exerciseIds } });
        if (exercises.length !== exerciseIds.length)
            return this.error(res, 400, 'Provided exercises are invalid');

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

        const program = isValidObjectId(id) && await Program.findById(id);
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

        const program = isValidObjectId(id) && await Program.findById(id);
        if (!program) return this.error(res, 404, 'Program not found');

        if (!program.creator.equals(req.user.id))
            return this.error(res, 403, 'You do not have permission to update this program');

        let { name, description, exercises: exerciseIds, sets, repetitions, rest, frequency } = req.body;

        if (!isNullish(name) && (typeof name !== 'string' || name.length === 0))
            return this.error(res, 400, 'Provided name is invalid');
        if (!isNullish(name)) program.name = name;

        if (!isNullish(description) && (typeof description !== 'string' || description.length === 0))
            return this.error(res, 400, 'Provided description is invalid');
        if (!isNullish(description)) program.description = description;

        if (!isNullish(exerciseIds)) {
            if (exerciseIds.some(id => !isValidObjectId(id)))
                return this.error(res, 400, 'Provided exercises are invalid');
        }

        if (!isNullish(sets) && (typeof sets !== 'number' || sets < 1))
            return this.error(res, 400, 'Sets must be a number greater than 0');
        if (!isNullish(sets)) program.sets = sets;

        if (!isNullish(repetitions) && (typeof repetitions !== 'number' || repetitions < 1))
            return this.error(res, 400, 'Repetitions must be a number greater than 0');
        if (!isNullish(repetitions)) program.repetitions = repetitions;

        if (!isNullish(rest) && (typeof rest !== 'number' || rest < 1))
            return this.error(res, 400, 'Rest must be a number greater than 0');
        if (!isNullish(rest)) program.rest = rest;

        if (!isNullish(frequency) && (typeof frequency !== 'string' || frequency.length === 0))
            return this.error(res, 400, 'Provided frequency is invalid');

        if (!isNullish(exerciseIds)) {
            const objects = await Exercise.find({ _id: { $in: exerciseIds } });
            const exercises = exerciseIds.map(id => objects.find(e => e.id === id));
            if (exercises.some(e => !e))
                return this.error(res, 400, 'Provided exercises are invalid');
            program.exercises = exercises.map(e => e._id);
        }

        if (program.isModified()) {
            const result = await program.save().catch(() => null);
            if (!result) return this.error(res, 500, 'Failed to update program');
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

        const program = isValidObjectId(id) && await Program.findById(id);
        if (!program) return this.error(res, 404, 'Program not found');

        if (!program.creator.equals(req.user.id))
            return this.error(res, 403, 'You do not have permission to delete this program');

        return program.deleteOne()
            .then(() => this.success(res, {}))
            .catch(() => this.error(res, 500, 'Failed to delete program'));
    }
}

module.exports = { ProgramsController };
