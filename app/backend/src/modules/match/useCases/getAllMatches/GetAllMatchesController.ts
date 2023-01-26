import { Request, Response } from 'express';
import GetAllMatchesUseCase from './GetAllMatchesUseCase';

interface query{
  inProgress: string
}

export default class GetAllMatchesController {
  private getAllMatchesUseCase: GetAllMatchesUseCase;
  constructor() {
    this.getAllMatchesUseCase = new GetAllMatchesUseCase();
  }

  handle = async (req: Request, res: Response) => {
    const { inProgress } = req.query as unknown as query;
    const matches = await this.getAllMatchesUseCase.execute(inProgress);

    return res.status(200).json(matches);
  };
}
