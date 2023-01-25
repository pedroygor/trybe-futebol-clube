import { Request, Response } from 'express';
import GetTeamByIdUseCase from './GetTeamByIdUseCase';

export default class GetTeamByIdController {
  private getTeamByIdUseCase: GetTeamByIdUseCase;

  constructor() {
    this.getTeamByIdUseCase = new GetTeamByIdUseCase();
  }

  handle = async (req: Request, res: Response) => {
    const { id } = req.params;

    const { type, message } = await this.getTeamByIdUseCase.execute(Number(id));

    if (type) {
      return res.status(type).json({ message });
    }

    return res.status(200).json(message);
  };
}
