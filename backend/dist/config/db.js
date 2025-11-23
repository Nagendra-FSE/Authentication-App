import mongose from 'mongoose';
import { MONGO_URI } from '../constants/env.js';
import dotenv from 'dotenv';
dotenv.config();
const connectDB = async () => {
    try {
        await mongose.connect(MONGO_URI);
        console.log('MongoDB connected successfully');
    }
    catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};
export default connectDB;
//# sourceMappingURL=db.js.map