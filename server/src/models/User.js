const { Schema, model } = require('mongoose');
const { hashPassword } = require('../utilities/crypto');

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

schema.pre('save', function (next) {
    if (this.isModified('password'))
        this.password = hashPassword(this.password);
    next();
});

const User = model('User', schema);

module.exports = { User };
