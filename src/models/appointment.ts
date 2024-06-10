import mongoose from "mongoose";
import { updatePrimaryKey } from "utils/update-primary-key";
import { validate} from "utils/validate-time";

export interface IAppointment extends Document {
    _id: number;
    userId: number;
    serviceId: number;
    businessId: number;
    startTime: string;
    endTime: string;
}

const appointmentSchema = new mongoose.Schema<IAppointment>({
    _id: {type: Number},
    userId: {type: Number, ref:"User"},
    serviceId: {
        type: Number,
        ref: "Service"
    },
    businessId: {type: Number, ref:"Business"},
    startTime: {type: String, required:true, validate},
    endTime: {type: String, validate}
});

// Auto-increment _id before saving
appointmentSchema.pre('save', async function (next) {
    if (this.isNew) {
        const counter = await updatePrimaryKey("serviceId");
        this._id = counter.seq;
    }
    next();
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;