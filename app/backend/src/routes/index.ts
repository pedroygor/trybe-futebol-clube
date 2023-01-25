import { Router } from 'express';

import authenticateRoutes from './authenticate.routes';
import teamRoutes from './team.routes';

const routes = Router();

routes.use(authenticateRoutes);
routes.use(teamRoutes);

export default routes;
