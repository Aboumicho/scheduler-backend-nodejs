import mongoose, { Document, Schema } from 'mongoose';
import User, { IUser } from './user';
import { updatePrimaryKey } from 'utils/update-primary-key';

export interface IBusinessUser extends Document {
    _id: number;
    userId: number;
    businessSpecificField: string;
}

const businessUserSchema = new Schema<IBusinessUser>({
    _id: {type: Number},
    userId: { type: Number, ref: 'User', required: true },
    businessSpecificField: { type: String, required: true }
});

businessUserSchema.pre('save', async function(next) {
    const doc = this;
    if (doc.isNew) {
        const counter = await updatePrimaryKey("businessUserId");
        doc._id = counter.seq;
    }
    next();
});

const BusinessUser = mongoose.model<IBusinessUser>('BusinessUser', businessUserSchema);

export default BusinessUser;
