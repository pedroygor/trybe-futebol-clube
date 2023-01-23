import User from '../../../database/models/User';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';

export default class UserService {
  create = async ({ password, username, role, email }: ICreateUserDTO) => {
    await User.create({ password, username, role, email });
  };

  getAll = async () => {
    const allUsers = await User.findAll();

    return allUsers;
  };
}
