import jwt from 'jsonwebtoken';
import { IUser } from 'models/user';

const secret = 'your-secret-key'; // Use an environment variable in a real application

const extractToken = (req) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    return token;
}

export const generateToken = (user: IUser) => {
    return jwt.sign({ id: user._id, email: user.email, name: user.name }, secret, { expiresIn: '72h' });
};

export const isValidToken = (req) => {
    try {
        const token = extractToken(req);
        return jwt.verify(token, secret, (err, user) => {
            if(err){
                return false;
            }
            return true;
        });
    } catch (err) {
        return false; // Unauthorized if no token is provided
    }
};

/**
 * Function to decode a JWT token.
 * @param {string} token - The JWT token to decode.
 * @returns {object} - The decoded payload of the JWT.
 */
export const decodeJwtToken = (req) => {
    try {
        const decoded = jwt.decode(extractToken(req), { complete: true });
        return decoded ? decoded.payload : null;
    } catch (error) {
        console.error('Error decoding JWT:', error);
        return null;
    }
}