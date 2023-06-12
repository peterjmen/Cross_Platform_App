const { Schema, model } = require('mongoose');

const schema = new Schema(
    {
        checked: {
            type: Boolean,
            default: false,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        bodyPart: {
            type: String,
            required: true,
        },

        imageUrl: {
            type: String,
            required: true,
        },

        muscles: {
            type: [String],
            required: true,
            // Ensure at least one is provided
            validate: (v) => Array.isArray(v) && v.length > 0,
        },

        description: {
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
            }
        }
    },
);

const Exercise = model('Exercise', schema);

module.exports = { Exercise };