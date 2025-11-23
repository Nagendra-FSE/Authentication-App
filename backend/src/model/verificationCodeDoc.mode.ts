import mongoose from "mongoose";
import type VerificationCodeType from "../constants/verificationCodeType.js";

export interface VerificationCodeDoc extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    type: VerificationCodeType;
    expiresAt: Date;
    createdAt: Date;
}

const verificationCodeSchema = new mongoose.Schema<VerificationCodeDoc>(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
        type: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        expiresAt: { type: Date, required: true },
    },
    { timestamps: true }
);



const VerificationCodeModel = mongoose.model<VerificationCodeDoc>('VerificationCode', verificationCodeSchema, 'verification_codes');

export default VerificationCodeModel;