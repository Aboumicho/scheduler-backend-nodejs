import mongoose, { Document, Schema } from 'mongoose';
import User, { IUser } from './user';
import { updatePrimaryKey } from 'utils/update-primary-key';

export interface IEmployeeUser extends Document {
    _id: number;
    userId: number;
    employeeSpecificField: string;
}

const employeeUserSchema = new Schema<IEmployeeUser>({
    _id: {type: Number},
    userId: { type: Number, ref: 'User', required: true },
    employeeSpecificField: { type: String, required: true }
});

employeeUserSchema.pre('save', async function(next) {
    const doc = this;
    if (doc.isNew) {
        const counter = await updatePrimaryKey("employeeUserId");
        doc._id = counter.seq;
    }
    next();
});
const EmployeeUser = mongoose.model<IEmployeeUser>('EmployeeUser', employeeUserSchema);

export default EmployeeUser;
