import { Request, Response } from 'express';
import AuthenticateUserUseCase from './AuthenticateUserUseCase';

export default class AuthenticateUserController {
  private authenticateUserUseCase: AuthenticateUserUseCase;

  constructor() {
    this.authenticateUserUseCase = new AuthenticateUserUseCase();
  }

  handle = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { type, message } = await this.authenticateUserUseCase.execute({ email, password });

    if (type) {
      return res.status(type).json({ message });
    }

    return res.status(200).json({ token: message });
  };
}
