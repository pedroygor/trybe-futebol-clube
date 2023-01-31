import { Router } from 'express';

import RankingHomeController from '../modules/leaderboards/useCase/RankingHomeController';

const leaderboardsRoute = Router();

const rankingHomeController = new RankingHomeController();

leaderboardsRoute.get('/leaderboard/home', rankingHomeController.handle);

export default leaderboardsRoute;
