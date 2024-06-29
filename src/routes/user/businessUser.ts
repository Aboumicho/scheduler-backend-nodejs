import express from 'express';
const router = express.Router();
import User from "../../models/user/user";
import {decodeJwtToken, isValidToken } from 'utils/jwt';
import BusinessUser from 'models/user/businessUser';

// Create a new user
router.post('/register', async (req, res) => {

    try {
        if(!isValidToken(req)){
            throw {code: 403, message: "User is not authenticated"}
        }
        const {id} = decodeJwtToken(req);
        const businessUser = new BusinessUser({
            userId: id
        });
        const newBusinessUser = await businessUser.save();
        res.status(201).json(newBusinessUser);
    } catch (err) {
        if (err.code === 11000) {
            // Duplicate email
            res.status(400).json({ message: 'Business user already exists' });
        }else{
            res.status(err.code ?? 400).json({ message: err.message });
        }
    }
});

export default router;