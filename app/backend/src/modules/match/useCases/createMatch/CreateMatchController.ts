import { Request, Response } from 'express';
import CreateMatchUseCase from './CreateMatchUseCase';

export default class CreateMatchController {
  private createMatchUseCase: CreateMatchUseCase;

  constructor() {
    this.createMatchUseCase = new CreateMatchUseCase();
  }

  handle = async (req: Request, res: Response) => {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;

    const { type, message } = await this.createMatchUseCase
      .execute({ homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals });

    if (type) {
      return res.status(type).json({ message });
    }

    return res.status(201).json(message);
  };
}
