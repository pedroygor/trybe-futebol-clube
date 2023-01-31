import { Request, Response } from 'express';
import AlgoUseCase from './RankingHomeUseCase';

export default class RankingHomeController {
  private algoUseCase: AlgoUseCase;
  constructor() {
    this.algoUseCase = new AlgoUseCase();
  }

  handle = async (req: Request, res: Response) => {
    const result = await this.algoUseCase.homeRanking();

    res.status(200).json(result);
  };
}
