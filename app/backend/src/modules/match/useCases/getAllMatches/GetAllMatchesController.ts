import { Request, Response } from 'express';
import GetAllMatchesUseCase from './GetAllMatchesUseCase';

export default class GetAllMatchesController {
  private getAllMatchesUseCase: GetAllMatchesUseCase;
  constructor() {
    this.getAllMatchesUseCase = new GetAllMatchesUseCase();
  }

  handle = async (_req: Request, res: Response) => {
    const matches = await this.getAllMatchesUseCase.execute();

    return res.status(200).json(matches);
  };
}
