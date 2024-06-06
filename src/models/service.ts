import mongoose from "mongoose";
import { updatePrimaryKey } from "utils/update_primary-key";

export interface IService extends Document {
    _id: number;
    businessId: number;
    name: string;
    price: string;
    description: string;
    duration: string;
}

const serviceSchema = new mongoose.Schema<IService>({
    _id: {type: Number},
    businessId: {
        type: Number,
        ref: "Business"
    },
    name: {type: String, required: true},
    price: {type: String, required:true},
    description: {type: String, required: true},
    duration: {type: String, match: /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/}
});

serviceSchema.index({ businessId: 1, name: 1 }, { unique: true });

// Auto-increment _id before saving
serviceSchema.pre('save', async function (next) {
    if (this.isNew) {
        const counter = await updatePrimaryKey("serviceId");
        this._id = counter.seq;
    }
    next();
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;