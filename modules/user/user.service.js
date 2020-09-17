import {AuthenticationError, UserInputError} from 'apollo-server';
import bcrypt from 'bcrypt';

import {User} from '../../models';
import generateToken from "../../utils/createToken";
import verifyUser from "../../utils/verifyUser";
import generatePasswordHash from "../../utils/generatePasswordHash";

class UserService {
    getUsers() {
        return User.find();
    }

    getUser(id) {
        return this.getUserByFieldOrThrow('_id', id);
    }

    registerUser(data) {
        const user = new User(data);
        return user.save();
    }

    async getUserByFieldOrThrow(key, param) {
        const checkedUser = await User.findOne({
            [key]: param,
        });

        if (!checkedUser) {
            const USER_WITH_KEY_NOT_FOUND = `User with provided ${[key]} not found`;
            throw new UserInputError(USER_WITH_KEY_NOT_FOUND, {
                errors: {
                    [key]: USER_WITH_KEY_NOT_FOUND,
                },
            });
        }

        return checkedUser;
    }

    async loginUser({email, password}) {
        const user = await this.getUserByFieldOrThrow('email', email)

        if (user.role === 'user') {
            throw new AuthenticationError(`No access!`);
        }

        const match = await bcrypt.compare(
            password,
            user.password,
        );

        if (!match || !user) {
            throw new Error(`Wrong email or password!`);
        }

        const token = await generateToken(user._id, user.email);

        return {
            name: user.name,
            id: user._id,
            role: user.role,
            token,
        };
    }

    async updateUserByToken({value, key, token}) {
        const user = verifyUser(token)

        if (!user) throw new AuthenticationError('Bad token bitch')

        const checkedUser = await this.getUserByFieldOrThrow('email', user.email)

        if (key === 'password') {
            value = await generatePasswordHash(value)
        }

        const updatedUser = await User.findByIdAndUpdate(
            {_id: checkedUser._id},
            {[key]: value},
            { new: true },
        )

        const refreshedToken = await generateToken(updatedUser._id, updatedUser.email);

        return {
            name: updatedUser.name,
            id: updatedUser._id,
            role: updatedUser.role,
            email: updatedUser.email,
            token: refreshedToken,
        }
    }
}

export default new UserService();
