import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { PORT, ORIGIN } from './constants/env.ts';
import connectDB from './config/db.ts';
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/errorHandler.ts';
import catchErrors from './utils/catchErrors.ts';
import { OK } from './constants/http.ts';
import authRoutes from './routes/auth.route.ts';
import { authentication } from './middleware/authentication.ts';
import userRoutes from './routes/user.routes.ts';
import sessionRoutes from './routes/session.routes.ts';
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