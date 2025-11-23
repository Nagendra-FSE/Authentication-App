import mongoose from "mongoose";
import { hashValue, compareHash } from "../utils/bcypt.js";
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false, required: true },
}, {
    timestamps: true
});
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await hashValue(this.password);
    next();
});
userSchema.methods.comparePassword = async function (val) {
    return await compareHash(val, this.password);
};
userSchema.methods.omitPassword = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};
const UserModel = mongoose.model('User', userSchema);
export default UserModel;
//# sourceMappingURL=user.model.js.map