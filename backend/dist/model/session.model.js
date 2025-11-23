import mongoose from 'mongoose';
import { addDaysToDate } from '../utils/date.js';
const sessionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    createdAt: { type: Date, default: Date.now },
    expiredAt: { type: Date, required: true, default: addDaysToDate(7 * 24 * 60 * 60 * 1000) },
    userAgent: { type: String },
}, { timestamps: true });
const SessionModel = mongoose.model('Session', sessionSchema, 'sessions');
export default SessionModel;
//# sourceMappingURL=session.model.js.map