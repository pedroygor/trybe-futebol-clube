import { Router } from 'express';

import authenticateRoutes from './authenticate.routes';
import teamRoutes from './team.routes';
import matchRoutes from './match.routes';
import leaderboardsRoute from './leaderboard.routes';

const routes = Router();

routes.use(authenticateRoutes);
routes.use(teamRoutes);
routes.use(matchRoutes);
routes.use(leaderboardsRoute);

export default routes;
