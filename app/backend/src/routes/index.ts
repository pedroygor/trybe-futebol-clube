import { Router } from 'express';

import authenticateRoutes from './authenticate.routes';
import teamRoutes from './team.routes';
import matchRoutes from './match.routes';

const routes = Router();

routes.use(authenticateRoutes);
routes.use(teamRoutes);
routes.use(matchRoutes);

export default routes;
