const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
    {
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        name: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: false,
        },

        exercises: {
            type: [Schema.Types.ObjectId],
            ref: 'Exercise',
            required: true,
        },

        sets: {
            type: Number,
            required: true,
        },

        repetitions: {
            type: Number,
            required: true,
        },

        rest: {
            type: Number,
            required: true,
        },

        frequency: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform(_, record) {
                record.id = record._id;
                delete record._id;
                delete record.__v;
                return record;
            },
        },
    }
);

schema.index({
    name: 'text',
    description: 'text',
    'exercises.name': 'text',
    'exercises.description': 'text',
    'exercises.bodyPart': 'text',
    'exercises.muscles': 'text',
});

const Program = mongoose.model('Program', schema);

module.exports = { Program };