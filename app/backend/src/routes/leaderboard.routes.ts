import { Router } from 'express';

import RankingHomeController
  from '../modules/leaderboards/useCase/rankingHome/RankingHomeController';
import RankingAwayController
  from '../modules/leaderboards/useCase/rankingAway/RankingAwayController';

const leaderboardsRoute = Router();

const rankingHomeController = new RankingHomeController();

const rankingAwayController = new RankingAwayController();

leaderboardsRoute.get('/leaderboard/home', rankingHomeController.handle);
leaderboardsRoute.get('/leaderboard/away', rankingAwayController.handle);

export default leaderboardsRoute;
