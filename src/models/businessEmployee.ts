import mongoose, { Document, Schema } from 'mongoose';

export interface IBusinessEmployee extends Document {
    businessId: number;
    employeeUserId: number;
}

const businessEmployeeSchema = new Schema<IBusinessEmployee>({
    businessId: { type: Number, ref: 'Business', required: true },
    employeeUserId: { type: Number, ref: 'EmployeeUser', required: true }
});

businessEmployeeSchema.index({ businessId: 1, employeeUserId: 1 }, { unique: true });

const BusinessEmployee = mongoose.model<IBusinessEmployee>('BusinessEmployee', businessEmployeeSchema);

export default BusinessEmployee;
