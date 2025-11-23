import { Router } from 'express';
import { deleteSessionHandler, getSessionHandler } from '../controllers/session.controller.js';
const sessionRoutes = Router();
sessionRoutes.get('/', getSessionHandler);
sessionRoutes.get('/:id', deleteSessionHandler);
export default sessionRoutes;
//# sourceMappingURL=session.routes.js.map