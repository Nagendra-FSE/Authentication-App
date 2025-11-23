import mongoose from "mongoose";
import { hashValue, compareHash } from "../utils/bcypt.js";


export interface UserDocument extends mongoose.Document {
    email: string;
    password: string;
    verified: boolean;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(val: string): Promise<boolean>;
    omitPassword(): Pick<UserDocument, '_id' | 'email' | 'verified' | 'createdAt' | 'updatedAt'>;
}


const userSchema = new mongoose.Schema<UserDocument>(
    {
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        password: { type: String, required: true },
        verified: { type: Boolean, default: false, required: true },
    },
    { 
        timestamps: true 
    }
);

userSchema.pre<UserDocument>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    } 
    this.password = await hashValue(this.password);
    next();
});

userSchema.methods.comparePassword = async function (val: string): Promise<boolean> {
    return await compareHash(val, this.password);
}

userSchema.methods.omitPassword = function() {
    const obj = this.toObject();
    delete obj.password;
    return obj;
}

const UserModel = mongoose.model<UserDocument>('User', userSchema);

export default UserModel;
