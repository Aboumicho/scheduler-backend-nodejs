import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import { updatePrimaryKey } from "utils/update-primary-key";

export interface IUser extends Document {
    _id: number;
    name: string;
    email: string;
    password: string;
    usertype: [string];
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>({
    _id: { type: Number},
    name: String,
    email: {type: String, required: true, unique: true},
    password: String
});

userSchema.pre('save', async function(next) {
    const doc = this;
    if (doc.isNew) {
        const counter = await updatePrimaryKey("userId");
        doc._id = counter.seq;
    }
    if (doc.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        doc.password = await bcrypt.hash(doc.password, salt);
    }
    next();
});

// Method to compare password
userSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
