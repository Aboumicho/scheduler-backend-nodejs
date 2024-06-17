import express from 'express';
import Appointment from 'models/appointment';
import Business from 'models/business';
import { decodeJwtToken, isValidToken } from 'utils/jwt';
const router = express.Router();

router.post("/add", async (req, res)=>{
    try{
        if(!isValidToken(req)){
            return res.status(403).json({ message: 'Invalid token' });
        }
        const token = decodeJwtToken(req);
        const userId = token.id;
        const {serviceId, businessId, startTime, endTime} = req.body;
        
        //case if appointment already booked
        const existingAppointment = await Appointment.find({businessId, serviceId, startTime})
        if(existingAppointment && existingAppointment.length > 0){
            return res.status(400).json({message: "Appointment is already booked"});
        }else{
            const newAppointment = new Appointment({
                userId,
                serviceId,
                businessId,
                startTime,
                endTime
            });
            const appointment = await newAppointment.save();
            return res.status(201).json({appointment});
        }
    }catch(error){
        if(error.code === 11000){
            return res.status(400).json({message: "Appointment already exists, try another name"});
        }else{
            return res.status(500).json({message: "Unable to create new appointment"});
        }
    }

});

router.put("/update/:id", async (req, res) => {
    try{
        if (!isValidToken(req)) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        const token = decodeJwtToken(req);
        const userId = token.id;
        const appointmentId = req.params.id;
        const {startTime, endTime} = req.body;
        const existingAppointment = await Appointment.findById({_id: appointmentId});
        const existingBusiness = await Business.findById({_id: existingAppointment.businessId});
        if(userId !== existingAppointment.userId || userId !== existingBusiness.userId){
            return res.status(401).json({message: "Unauthorized for user"});
        }
        if(!existingAppointment){
            return res.status(404).json({message:"Appointment doesn't exist"});
        }
        const newAppointment = await Appointment.findOneAndUpdate({_id: appointmentId}, {startTime, endTime});
        return res.status(201).json(newAppointment);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
})

router.get("/:appointmentId", async(req, res)=>{
    try{
        const {appointmentId} = req.params;
        const appointment = await Appointment.findById(appointmentId);
        if(!appointment){
            res.status(404).json({message:"No appointment available"});
        }else{
            res.status(201).json({appointment});
        }
    }catch(error){
        res.status(500).json({message: error.message});
    }

});

export default router;