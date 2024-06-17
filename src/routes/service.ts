import express from 'express';
import { isValidToken } from 'utils/jwt';
const router = express.Router();
import Service from '../models/service';
import Availability from 'models/availability';

router.post("/add", async (req,res) => {
    try{
        if(!isValidToken(req)){
            return res.status(403).json({ message: 'Invalid token' });
        }
        const {businessId, name, price, description, duration} = req.body;
        const service = new Service({
            businessId,
            name,
            price,
            description,
            duration
        });
        const newService = await service.save();
        res.status(201).json(newService);
    }
    catch(error){
        if(error.code === 11000){
            res.status(400).json({message: "This service already exists for this service."})
        }else{
            res.status(400).json({message: "Couldn't add service"});
        }
    }
});

router.get("/:serviceId", async(req, res)=>{
    try{
        const {serviceId} = req.params;
        const service = Service.findById(serviceId);
        if(!service){
            res.status(404).json({message: "Service not found."});
        }else{
            res.status(201).json({service});
        }
    }catch(error){
        res.status(500).json({error: error.message})
    }
});

router.get("/get-service-availabilities/:serviceId", async (req, res)=>{
    try{
        const {serviceId} = req.params;
        const availabilities = await Availability.find({serviceId});
        if(!availabilities || availabilities.length === 0){
            res.status(404).json({message:"No availabilities found for this service."});
        }else{
            res.status(201).json({availabilities});
        }

    }catch(error){
        res.status(500).json({error: error.message})
    }
});

export default router;