import jwt from 'jsonwebtoken';

const generateToken = async (userId, email) => {
    return await jwt.sign({userId, email}, process.env.SECRET, {
        expiresIn: process.env.EXPIRES_IN,
    });
};

export default generateToken
