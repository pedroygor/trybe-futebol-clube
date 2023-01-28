import { Request, Response } from 'express';
import CreateMatchUseCase from './CreateMatchUseCase';

export default class CreateMatchController {
  private createMatchUseCase: CreateMatchUseCase;

  constructor() {
    this.createMatchUseCase = new CreateMatchUseCase();
  }

  handle = async (req: Request, res: Response) => {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;

    const newMatch = await this.createMatchUseCase
      .execute({ homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals });

    return res.status(201).json(newMatch);
  };
}
