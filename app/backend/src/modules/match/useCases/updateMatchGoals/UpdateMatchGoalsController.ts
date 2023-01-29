import { Request, Response } from 'express';
import UpdateMatchGoalsUseCase from './UpdateMatchGoalsUseCase';

export default class UpdateMatchGoalsController {
  private updateMatchGoalsUseCase: UpdateMatchGoalsUseCase;

  constructor() {
    this.updateMatchGoalsUseCase = new UpdateMatchGoalsUseCase();
  }

  handle = async (req: Request, res: Response) => {
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { id } = req.params;
    const infoMatch = { id: Number(id), homeTeamGoals, awayTeamGoals };

    await this.updateMatchGoalsUseCase.execute(infoMatch);

    return res.status(200).json();
  };
}
