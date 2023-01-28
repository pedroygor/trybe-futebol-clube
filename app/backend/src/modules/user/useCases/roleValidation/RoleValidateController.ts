import { Request, Response } from 'express';
import RoleValidateUseCase from './RoleValidateUseCase';

export default class RoleValidateController {
  private roleValidateUseCase : RoleValidateUseCase;
  constructor() {
    this.roleValidateUseCase = new RoleValidateUseCase();
  }

  handle = async (req: Request, res: Response) => {
    const { userId } = req.headers;

    const { type, message } = await this.roleValidateUseCase.execute(Number(userId));

    if (type) {
      return res.status(type).json({ message });
    }

    return res.status(200).json({ role: message });
  };
}
