import express from 'express';
const router = express.Router();
import User from "../../models/user/user";
import {decodeJwtToken, isValidToken } from 'utils/jwt';
import CustomerUser from 'models/user/customerUser';

// Create a new user
router.post('/register', async (req, res) => {

    try {
        if(!isValidToken(req)){
            throw {code: 403, message: "User is not authenticated"}
        }
        const {id} = decodeJwtToken(req);
        const customerUser = new CustomerUser({
            userId: id
        });
        const newCustomerUser = await customerUser.save();
        res.status(201).json(newCustomerUser);
    } catch (err) {
        if (err.code === 11000) {
            // Duplicate email
            res.status(400).json({ message: 'Customer already exists' });
        }else{
            res.status(err.code ?? 400).json({ message: err.message });
        }
    }
});

export default router;