import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { PORT, ORIGIN } from './constants/env.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/errorHandler.js';
import catchErrors from './utils/catchErrors.js';
import { OK } from './constants/http.js';
import authRoutes from './routes/auth.route.js';
import { authentication } from './middleware/authentication.js';
import userRoutes from './routes/user.routes.js';
import sessionRoutes from './routes/session.routes.js';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ORIGIN,
    credentials: true,
}));
app.use(cookieParser());
app.get('/', catchErrors(async (req, res, next) => {
    try {
        return res.status(OK).json({ status: 'helthy' });
    }
    catch (error) {
        next(error);
    }
}));
app.use('/auth', authRoutes);
app.use('/user', authentication, userRoutes);
app.use('/session', authentication, sessionRoutes);
app.use(errorHandler);
app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map