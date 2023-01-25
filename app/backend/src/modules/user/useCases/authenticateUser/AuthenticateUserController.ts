import { Request, Response } from 'express';
import AuthenticateUserUseCase from './AuthenticateUserUseCase';

export default class AuthenticateUserController {
  private authenticateUserUseCase: AuthenticateUserUseCase;

  constructor() {
    this.authenticateUserUseCase = new AuthenticateUserUseCase();
  }

  handle = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const response = await this.authenticateUserUseCase.execute({ email, password });

    if (response.type) {
      return res.status(response.type).json(response.message);
    }

    return res.status(200).json(response.message);
  };
}
