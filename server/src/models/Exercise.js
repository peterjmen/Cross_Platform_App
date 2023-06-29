const { Schema, model } = require('mongoose');
const { Program } = require('./Program');

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
            trim: true,
        },

        description: {
            type: String,
            required: true,
        },

        bodyPart: {
            type: String,
            required: true,
        },

        muscles: {
            type: [String],
            required: true,
            validate: (v) => Array.isArray(v),
        },

        imageUrl: {
            type: String,
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
                record.id ??= record._id?.toString();
                delete record._id;
                delete record.__v;
                return record;
            }
        }
    },
);

// Enable text search on name, description, body part, and muscles
schema.index({
    name: 'text',
    description: 'text',
    bodyPart: 'text',
    muscles: 'text'
});

// Upon deletion, remove the exercise from all programs
schema.pre('deleteOne', { document: true, query: false }, async function () {
    const { _id } = this;
    await Program.updateMany({ exercises: _id }, { $pull: { exercises: _id } });
});

const Exercise = model('Exercise', schema);

module.exports = { Exercise };
