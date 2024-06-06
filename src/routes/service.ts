import express from 'express';
import { isValidToken } from 'utils/jwt';
const router = express.Router();
import Service from '../models/service';

router.post("/add", async (req,res) => {
    try{
        if(!isValidToken(req, res)){
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
            res.status(400).json({message: "This service already exists for this Business."})
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
        }
    }catch(error){
        res.status(500).json({error: error.message})
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