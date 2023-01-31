import { Router } from 'express';

import RankingFullController
  from '../modules/leaderboards/useCase/rankingFull/RankingFullController';
import RankingHomeController
  from '../modules/leaderboards/useCase/rankingHome/RankingHomeController';
import RankingAwayController
  from '../modules/leaderboards/useCase/rankingAway/RankingAwayController';

const leaderboardsRoute = Router();

const rankingHomeController = new RankingHomeController();

const rankingAwayController = new RankingAwayController();

const rankingFullController = new RankingFullController();

leaderboardsRoute.get('/leaderboard/home', rankingHomeController.handle);
leaderboardsRoute.get('/leaderboard/away', rankingAwayController.handle);
leaderboardsRoute.get('/leaderboard', rankingFullController.handle);

export default leaderboardsRoute;
