import express from 'express';
import Availability from 'models/availability';
import { decodeJwtToken, isValidToken } from 'utils/jwt';
const router = express.Router();

router.put("/update/:id", async(req, res) => {
    try{
        if (!isValidToken(req)) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        const token = decodeJwtToken(req);
        const userId = token.id;
        const { serviceId, businessId, startTime, endTime, breaks } = req.body;

        const availabilityId = req.params.id;

        const availability = await Availability.findById(availabilityId);

        if (!availability) {
            return res.status(404).json({ message: 'Availability not found' });
        }

        // Ensure the user has permission to update this availability
        if (availability.userId !== userId) {
            return res.status(403).json({ message: 'You do not have permission to update this availability' });
        }
        else{
            const updatedAvailability = await Availability.findOneAndUpdate({_id: availabilityId}, {serviceId, businessId, startTime, endTime, breaks} );
            return res.status(200).json({ updatedAvailability });
        }
    }catch(error){
        return res.status(500).json({message: error.message});
    }
});

router.post("/add", async (req, res)=>{
    try{
        if(!isValidToken(req)){
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