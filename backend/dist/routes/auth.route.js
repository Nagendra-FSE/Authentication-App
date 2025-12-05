import { Router } from 'express';
import { loginHandler, logoutHandler, registerHandler, refreshTokenHandler, verifyEmailHandler, sendPasswordResetHandler, passwordResetHandler } from '../controllers/auth.controller.js';
const authRoutes = Router();
authRoutes.post('/register', registerHandler);
authRoutes.post('/login', loginHandler);
authRoutes.get('/refresh', refreshTokenHandler);
authRoutes.get('/logout', logoutHandler);
authRoutes.get('/email/verify/:code', verifyEmailHandler);
authRoutes.post('/password/forgot/', sendPasswordResetHandler);
authRoutes.post('/password/reset/', passwordResetHandler);
// authRoutes.get('/sms/verify/:code', );
export default authRoutes;
//# sourceMappingURL=auth.route.js.map