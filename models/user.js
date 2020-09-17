import {Schema, model} from 'mongoose';

import generatePasswordHash from "../utils/generatePasswordHash";

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});

userSchema.pre('save', function(next) {
    const user = this;

    generatePasswordHash(user.password)
        .then(hash => {
            user.password = String(hash);
            next();
        })
        .catch(err => {
            next(err);
        });
});

export default model('User', userSchema);
