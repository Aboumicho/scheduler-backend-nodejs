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
            throw {message: "Appointment is already booked", code: 400}
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
            return res.status(error.code ?? 500).json({message: error.message});
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
            throw {message: "Unauthorized for user", code: 401}
        }
        if(!existingAppointment){
            throw {message:"Appointment doesn't exist", code: 404}
        }
        const newAppointment = await Appointment.findOneAndUpdate({_id: appointmentId}, {startTime, endTime});
        return res.status(201).json(newAppointment);
    }catch(error){
        return res.status(error.code ?? 500).json({message: error.message});
    }
})

router.get("/:appointmentId", async(req, res)=>{
    try{
        const {appointmentId} = req.params;
        const appointment = await Appointment.findById(appointmentId);
        if(!appointment){
            throw {message:"No appointment available", code: 404}
        }else{
            res.status(201).json({appointment});
        }
    }catch(error){
        res.status(error.code ?? 500).json({message: error.message});
    }

});

export default router;