import { Router } from 'express';

import authenticateRoutes from './authenticate.routes';

const routes = Router();

routes.use(authenticateRoutes);

export default routes;
