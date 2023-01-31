import { Request, Response } from 'express';
import RankingFullUseCase from './RankingFullUseCase';

export default class RankingFullController {
  private rankingFullUseCase: RankingFullUseCase;
  constructor() {
    this.rankingFullUseCase = new RankingFullUseCase();
  }

  handle = async (req: Request, res: Response) => {
    const result = await this.rankingFullUseCase.fullRanking();

    res.status(200).json(result);
  };
}
