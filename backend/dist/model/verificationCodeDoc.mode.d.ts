import mongoose from "mongoose";
import type VerificationCodeType from "../constants/verificationCodeType.js";
export interface VerificationCodeDoc extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    type: VerificationCodeType;
    expiresAt: Date;
    createdAt: Date;
}
declare const VerificationCodeModel: mongoose.Model<VerificationCodeDoc, {}, {}, {}, mongoose.Document<unknown, {}, VerificationCodeDoc, {}, {}> & VerificationCodeDoc & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default VerificationCodeModel;
//# sourceMappingURL=verificationCodeDoc.mode.d.ts.map