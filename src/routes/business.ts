import express from 'express';
const router = express.Router();
import Business from "../models/business";
import { decodeJwtToken, isValidToken } from 'utils/jwt';
import Service from 'models/service';

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

router.put("/update/:businessId", async(req, res)=> {
    try{
        if(!isValidToken(req, res)){
            return res.status(403).json({ message: 'Invalid token' });
        }
        const {businessId} = req.params;
        const {name, phoneNumber, address, postalCode} = req.body;
        const token = decodeJwtToken(req);
        const userId = token.id;
        const business = await Business.findById({_id: businessId});
        if(userId != business.userId){
            return res.status(403).json({message: "Not allowed for this user"});
        }else{
            const updatedBusiness = await Business.findOneAndUpdate({_id: businessId}, {name, phoneNumber, address, postalCode})
            return res.status(201).json({updatedBusiness});
        }
    }catch(error){
        return res.status(500).json({message: error.message});
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

router.get("/get-business-services/:businessId", async(req, res)=> {
    try{
        const {businessId} = req.params;
        const services = await Service.find({businessId});
        // Check if any services were found
        if (!services || services.length === 0) {
            return res.status(404).json({ message: "No services found for the specified businessId." });
        }
        // If services are found, return them as a response
        res.json(services);
    }catch(error){
        res.status(500).json({error: error.message})
    }
});
export default router;