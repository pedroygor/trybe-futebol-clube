import { Request, Response } from 'express';
import RankingHomeUseCase from './RankingHomeUseCase';

export default class RankingHomeController {
  private rankingHomeUseCase: RankingHomeUseCase;
  constructor() {
    this.rankingHomeUseCase = new RankingHomeUseCase();
  }

  handle = async (req: Request, res: Response) => {
    const result = await this.rankingHomeUseCase.homeRanking();

    res.status(200).json(result);
  };
}
