const { Schema, model } = require('mongoose');

// Basic user schema, currently only stores email and password, needed to make auth route
const schema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
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
                delete record.password;
                return record;
            }
        }
    },
);

const User = model('User', schema);

module.exports = { User };
