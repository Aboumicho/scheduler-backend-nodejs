import express from 'express';
const router = express.Router();
import Business from "../models/business";
import { decodeJwtToken, isValidToken } from 'utils/jwt';

router.post('/add', async(req, res) => {
    try{
        if(!isValidToken(req, res)){
            return res.status(403).json({ message: 'Invalid token' });
        }
        const {name, phoneNumber, address, postalCode} = req.body;
        const token = decodeJwtToken(req);
        const business = new Business(
            {   
                name,
                phoneNumber,
                userId: parseInt(token.id),
                address,
                postalCode
            }
        );
        const newBusiness = await business.save();
        return res.status(201).json(newBusiness);
    }catch(error){
        if(error.code === 11000){
            return res.status(400).json({message: "Business already exists, try another name"});
        }else{
            return res.status(500).json({message: "Unable to create new business"});
        }
    }
});

router.get("/:businessId", async(req, res)=>{
    try{
        const { businessId } = req.params;
        const business = await Business.findById(businessId);
        if(!business){
            return res.status(404).json({message: "Business not found."});
        }
        res.status(201).json(business);
    }catch(error){
        res.status(500).json({error: error.message});
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