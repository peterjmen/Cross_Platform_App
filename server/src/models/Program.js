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
            autopopulate: true,
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
            },
        },
    }
);

// Enable text search on name, description, and exercises
schema.index({
    name: 'text',
    description: 'text',
    'exercises.name': 'text',
    'exercises.description': 'text',
    'exercises.bodyPart': 'text',
    'exercises.muscles': 'text',
});

// Autopopulate exercises
schema.plugin(require('mongoose-autopopulate'));

const Program = mongoose.model('Program', schema);

module.exports = { Program };