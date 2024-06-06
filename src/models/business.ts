import mongoose from "mongoose";
import { updatePrimaryKey } from "utils/update_primary-key";

export interface IBusiness extends Document {
    _id: number;
    name: string;
    phoneNumber: string;
    userId: number;
    address: string;
    postalCode: string;
}

const businessSchema = new mongoose.Schema<IBusiness>({
    _id: {type: Number},
    userId: {
        type: Number,
        ref: "User"
    },
    name: {type: String, unique: true, required: true},
    phoneNumber: {type: String, required:true},
    address: {type: String},
    postalCode: {type: String, required: true}
});

// Auto-increment _id before saving
businessSchema.pre('save', async function (next) {
    if (this.isNew) {
        const counter = await updatePrimaryKey("businessId");
        this._id = counter.seq;
    }
    next();
});

const Business = mongoose.model('Business', businessSchema);

export default Business;