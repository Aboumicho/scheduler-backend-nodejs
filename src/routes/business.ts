import express from 'express';
const router = express.Router();
import Business from "../models/business";
import { decodeJwtToken, isValidToken, validateAndAuthorize } from 'utils/jwt';
import Service from 'models/service';
import User from 'models/user/user';
import { USERTYPE } from 'constants/user-type';

router.post('/add', async(req, res) => {
    try{
        if(!isValidToken(req)){
            throw { message: 'Invalid token', code: 403 }
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
            return res.status(error.code ?? 500).json({message: "Unable to create new business"});
        }
    }
});

router.put("/update/:businessId", async(req, res)=> {
    try{
        const {businessId} = req.params;
        const {name, phoneNumber, address, postalCode} = req.body;
        const business = await Business.findById({_id: businessId});
        validateAndAuthorize(req, res, business.userId);
        const updatedBusiness = await Business.findOneAndUpdate({_id: businessId}, {name, phoneNumber, address, postalCode})
        return res.status(201).json({updatedBusiness});
    }catch(error){
        return res.status(error.code ?? 500).json({message: error.message});
    }
});

router.get("/:businessId", async(req, res)=>{
    try{
        const { businessId } = req.params;
        const business = await Business.findById(businessId);
        if(!business){
            throw {message: "Business not found.", code: 404}
        }
        res.status(201).json(business);
    }catch(error){
        res.status(error.code ?? 500).json({error: error.message});
    }
});

router.get("/get-business-services/:businessId", async(req, res)=> {
    try{
        const {businessId} = req.params;
        const services = await Service.find({businessId});
        // Check if any services were found
        if (!services || services.length === 0) {
            throw { message: "No services found for the specified businessId.", code: 404 };
        }
        // If services are found, return them as a response
        res.json(services);
    }catch(error){
        res.status(error.code ?? 500).json({error: error.message})
    }
});

router.post("/:businessId/add-business-employee", async (req, res) =>{
    try{
        
        const {businessId} = req.params;
        const business = await Business.findById(businessId);
        validateAndAuthorize(req, res, business.userId);
        const {email} = req.body;
        const employee = await User.findOne({email})
        if(!employee){
            // SEND INVITATION TO CREATE ACCOUNT
        }
        if(employee && !employee.usertype.includes(USERTYPE[USERTYPE.EMPLOYEE])){
            const usertype = employee.usertype;
            usertype.push(USERTYPE[USERTYPE.EMPLOYEE]);
            employee.usertype = usertype;
            await employee.save();
            await business.employees.push(employee.id);
            await business.save();
        }
        return res.status(200).json(employee);
    }catch(error){
        return res.status(error.code ?? 500).json({message: error.message});
    }
});

router.delete("/:businessId" , async(req, res) =>{
    try{
        const {businessId} = req.params;
        const business = await Business.findById(businessId);
        validateAndAuthorize(req, res, business.userId);
        await Business.deleteOne(businessId);
        return res.status(201).json({message: "Business deleted"});
    }catch(error){
        return res.status(error.code ?? 500).json({message: error.message});
    }
});

router.post("/:businessId/remove-employee", async (req, res) => {
    try{
        const {businessId} = req.params;
        const {userId} = req.body;
        const business = await Business.findById(businessId);
        validateAndAuthorize(req, res, business.userId);
        const employees = business.employees.filter(employee => employee != userId);
        business.employees = employees;
        await business.save();
        return res.status(201).json({message: "Employee deleted"});
    }catch(error){
        return res.status(error.code ?? 500).json({message: error.message});
    }
});

export default router;