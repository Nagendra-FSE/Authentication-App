import mongoose from 'mongoose';
export interface SessionDoc extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    userAgent?: string;
    createdAt: Date;
    expiredAt: Date;
}
declare const SessionModel: mongoose.Model<SessionDoc, {}, {}, {}, mongoose.Document<unknown, {}, SessionDoc, {}, {}> & SessionDoc & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default SessionModel;
//# sourceMappingURL=session.model.d.ts.map