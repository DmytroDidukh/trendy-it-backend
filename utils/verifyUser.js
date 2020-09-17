import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const verifyUser = token => {
    if (!token) return;
    try {
        return jwt.verify(token, process.env.SECRET);
    } catch (err) {
        throw new Error(err);
    }
};

export default verifyUser
