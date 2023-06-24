const { Schema, model } = require('mongoose');
const { hashPassword } = require('../utilities/crypto');
const { Exercise } = require('./Exercise');
const { Program } = require('./Program');

const schema = new Schema(
    {
        role: {
            type: String,
            default: 'user',
            enum: ['admin', 'physiotherapist', 'user'],
        },

        name: {
            type: String,
            required: true,
        },

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

// Hash password before saving
schema.pre('save', function (next) {
    if (this.isModified('password'))
        this.password = hashPassword(this.password);
    next();
});

// Upon deletion, delete all programs and exercises created by this user
schema.pre('deleteOne', { document: true, query: false }, async function () {
    const { _id } = this;
    await Program.deleteMany({ creator: _id });
    await Exercise.deleteMany({ creator: _id });
});

const User = model('User', schema);

module.exports = { User };
