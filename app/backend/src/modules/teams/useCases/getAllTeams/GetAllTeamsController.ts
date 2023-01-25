import { Request, Response } from 'express';
import GetAllTeamsUseCase from './GetAllTeamsUseCase';

export default class GetAllTeamsController {
  private getAllTeamsUseCase: GetAllTeamsUseCase;
  constructor() {
    this.getAllTeamsUseCase = new GetAllTeamsUseCase();
  }

  handle = async (req: Request, res: Response) => {
    const teams = await this.getAllTeamsUseCase.execute();

    return res.status(200).json(teams);
  };
}
