import { Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {
  userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  async login(req: Request, res: Response) {
    const allUsers = await this.userService.getAll();

    return res.status(200).json(allUsers);
  }
}

export default UserController;
