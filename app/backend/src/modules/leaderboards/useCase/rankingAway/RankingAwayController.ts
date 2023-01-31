import { Request, Response } from 'express';
import RankingAwayUseCase from './RankingAwayUseCase';

export default class RankingAwayController {
  private rankingAwayUseCase: RankingAwayUseCase;
  constructor() {
    this.rankingAwayUseCase = new RankingAwayUseCase();
  }

  handle = async (req: Request, res: Response) => {
    const result = await this.rankingAwayUseCase.awayRanking();

    res.status(200).json(result);
  };
}
