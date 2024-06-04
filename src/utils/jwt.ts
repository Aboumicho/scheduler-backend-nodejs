import jwt from 'jsonwebtoken';
import { IUser } from 'models/user';

const secret = 'your-secret-key'; // Use an environment variable in a real application

export const generateToken = (user: IUser) => {
    return jwt.sign({ id: user._id, email: user.email, name: user.name }, secret, { expiresIn: '72h' });
};

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        return null;
    }
};
