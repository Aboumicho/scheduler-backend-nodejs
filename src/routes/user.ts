import express from 'express';
const router = express.Router();
import User from "../models/user";
import { generateToken } from 'utils/jwt';
import { isUserTypeValid } from 'constants/user-type';
import Business from 'models/business';

// Create a new user
router.post('/register', async (req, res) => {

    try {
        if(!isUserTypeValid(req.body.usertype)){
            throw new Error("User type is not valid");
        }
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            usertype: [req.body.usertype]
        });
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        //Block to add new usertype to existing account
        /**
         * @todo refactor this later on
         *  */ 
        const user = await User.findOne({ email: req.body.email })
        if(!user.usertype.includes(req.body.usertype)){
            const updatedUserType = user.usertype;
            updatedUserType.push(req.body.usertype);
            Object.assign(user, {usertype: updatedUserType});
            const newUser = await user.save();
            res.status(201).json(newUser);
        }
        if (err.code === 11000) {
            // Duplicate email
            res.status(400).json({ message: 'Email already exists' });
        }else{
            res.status(400).json({ message: err.message });
        }
    }
});

// Login a user
router.post('/login', async (req: any, res:any) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(403).json({ message: 'Invalid email or password' });
        }

        const isMatch = await user.comparePassword(req.body.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = generateToken(user);
        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/get-user-businesses/:userId", async(req, res) => {
    try{
        const {userId} = req.params;
        const businesses = await Business.find({userId});
        if(businesses && businesses.length > 0){
            res.status(201).json(businesses);
        }
        else{
            res.status(404).json({message: "No business for this user"});
        }
    }catch(error){
        res.status(500).json({error: error.message});
    }
});

export default router;