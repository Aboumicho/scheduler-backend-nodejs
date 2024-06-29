import mongoose, { Document, Schema } from 'mongoose';
import User, { IUser } from './user';
import { updatePrimaryKey } from 'utils/update-primary-key';

export interface ICustomerUser extends Document {
    _id: number;
    userId: number;
}

const customerUserSchema = new Schema<ICustomerUser>({
    _id: {type: Number},
    userId: { type: Number, ref: 'User', required: true, unique: true },
});

customerUserSchema.pre('save', async function(next) {
    const doc = this;
    if (doc.isNew) {
        const counter = await updatePrimaryKey("customerUserId");
        doc._id = counter.seq;
    }
    next();
});
const CustomerUser = mongoose.model<ICustomerUser>('CustomerUser', customerUserSchema);

export default CustomerUser;
