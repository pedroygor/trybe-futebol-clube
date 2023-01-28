import { Request, Response } from 'express';
import ChangeStatusUseCase from './ChangeStatusUseCase';

export default class ChangeStatusController {
  private changeStatusUseCase: ChangeStatusUseCase;

  constructor() {
    this.changeStatusUseCase = new ChangeStatusUseCase();
  }

  handle = async (req: Request, res: Response) => {
    const { id } = req.params;
    const message = await this.changeStatusUseCase.execute(Number(id));

    return res.status(200).json(message);
  };
}
