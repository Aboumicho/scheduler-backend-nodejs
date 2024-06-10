import express from 'express';
import Availability from 'models/availability';
import { decodeJwtToken, isValidToken } from 'utils/jwt';
const router = express.Router();

router.post("/add", async (req, res)=>{
    try{
        if(!isValidToken(req, res)){
            res.status(403).json({ message: 'Invalid token' });
        }
        const token = decodeJwtToken(req);
        const userId = token.id;
        const {serviceId, businessId, startTime, endTime, breaks} = req.body;
        const newAppointment = new Availability({
                userId,
                serviceId,
                businessId,
                startTime,
                endTime, 
                breaks
            });
            const appointment = await newAppointment.save();
            res.status(201).json({appointment});


    }catch(error){
        res.status(500).json({message: error.message});
    }

});

export default router;