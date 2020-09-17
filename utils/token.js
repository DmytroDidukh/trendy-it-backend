import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
};

const generateRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
};

const generateEmailToken = (payload) => {
    return jwt.sign(payload, process.env.EMAIL_TOKEN_SECRET, {
        expiresIn: '1d',
    });
};

export {
    generateRefreshToken,
    generateAccessToken,
    generateEmailToken,
};
