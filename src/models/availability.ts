import mongoose from "mongoose";
import { updatePrimaryKey } from "utils/update-primary-key";

export interface IAvailability extends Document {
    _id: number;
    businessId: number;
    startTime: string;
    endTime: string;
    service: string;
    userId: number;
    serviceId: number;
    breaks: [string]
}

const validateBreaks = (doc, next) => {
    for (const breakTime of doc.breaks) {
        const breakSplit = breakTime.split("&")
        const breakStartTime = new Date(breakSplit[0]);
        const breakEndTime = new Date(breakSplit[1]);
        const startTime = new Date(doc.startTime);
        const endTime = new Date(doc.endTime);
        if (breakStartTime < startTime || breakStartTime > endTime || breakEndTime > endTime || breakEndTime < breakStartTime) {
            const error = new Error("Breaks are not in the range of availability");
            next(error);
        }
    }
}

const availabilitySchema = new mongoose.Schema<IAvailability>({
    _id: {type: Number},
    businessId: {
        type: Number,
        ref: "Business"
    },
    startTime: {type: String, required: true},
    endTime: {type: String, required:true},
    breaks:{type: [String]},
    userId: {type: Number, ref: "User"},
    serviceId: {type: Number, ref: "Service"}
});

availabilitySchema.index({ startTime: 1, businessId: 1, serviceId: 1 }, { unique: true });

// Auto-increment _id before saving
availabilitySchema.pre('save', async function (next) {
    if (this.isNew) {
        const counter = await updatePrimaryKey("appointmentId");
        this._id = counter.seq;
    }
    const doc = this as IAvailability;

    const overlappingAvailability = await mongoose.models.Availability.findOne({
        businessId: doc.businessId,
        serviceId: doc.serviceId,
        $or: [
            { startTime: { $lt: doc.endTime }, endTime: { $gt: doc.startTime } }
        ]
    });

    if (overlappingAvailability) {
        const error = new Error('An availability entry overlaps with the existing one for the same businessId and serviceId.');
        next(error);
    } 
    validateBreaks(doc, next);
    next();
});

const Availability = mongoose.model('Availability', availabilitySchema);

export default Availability;