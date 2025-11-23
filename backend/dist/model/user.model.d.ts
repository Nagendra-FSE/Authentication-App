import mongoose from "mongoose";
export interface UserDocument extends mongoose.Document {
    email: string;
    password: string;
    verified: boolean;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(val: string): Promise<boolean>;
    omitPassword(): Pick<UserDocument, '_id' | 'email' | 'verified' | 'createdAt' | 'updatedAt'>;
}
declare const UserModel: mongoose.Model<UserDocument, {}, {}, {}, mongoose.Document<unknown, {}, UserDocument, {}, {}> & UserDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default UserModel;
//# sourceMappingURL=user.model.d.ts.map