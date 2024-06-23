import express from 'express';
import { isValidToken } from 'utils/jwt';
const router = express.Router();
import Service from '../models/service';
import Availability from 'models/availability';

router.post("/add", async (req,res) => {
    try{
        if(!isValidToken(req)){
            throw { message: 'Invalid token', code:403}
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
            res.status(error.code ?? 500).json({message: "Couldn't add service"});
        }
    }
});

router.get("/:serviceId", async(req, res)=>{
    try{
        const {serviceId} = req.params;
        const service = Service.findById(serviceId);
        if(!service){
            throw {message: "Service not found.", code: 404};
        }else{
            res.status(201).json({service});
        }
    }catch(error){
        res.status(error.code ?? 500).json({error: error.message})
    }
});

router.get("/get-service-availabilities/:serviceId", async (req, res)=>{
    try{
        const {serviceId} = req.params;
        const availabilities = await Availability.find({serviceId});
        if(!availabilities || availabilities.length === 0){
            throw {message:"No availabilities found for this service.", code: 404};
        }else{
            res.status(201).json({availabilities});
        }

    }catch(error){
        res.status(error.code ?? 500).json({error: error.message})
    }
});

export default router;