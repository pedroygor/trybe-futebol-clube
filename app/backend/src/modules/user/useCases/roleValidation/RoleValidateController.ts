import { Request, Response } from 'express';
import RoleValidateUseCase from './RoleValidateUseCase';

export default class RoleValidateController {
  private roleValidateUseCase : RoleValidateUseCase;
  constructor() {
    this.roleValidateUseCase = new RoleValidateUseCase();
  }

  handle = async (req: Request, res: Response) => {
    const { id } = req.params;

    const { type, message } = await this.roleValidateUseCase.execute(Number(id));

    if (type) {
      return res.status(type).json({ message });
    }

    return res.status(200).json({ role: message });
  };
}
