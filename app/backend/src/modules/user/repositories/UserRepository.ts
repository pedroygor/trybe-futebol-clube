import { IUserRepository } from '../interfaces/IUserRepository';
import User from '../../../database/models/User';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';

export default class UserRepository implements IUserRepository {
  private userRepository = User;

  create = async ({ username, email, password, role }: ICreateUserDTO): Promise<User> => {
    const user = await this.userRepository.create({ username, email, password, role });

    return user;
  };

  findByEmail = async (email: string): Promise<User | null> => {
    const user = await this.userRepository.findOne({ where: { email } });

    return user;
  };

  findById = async (id: number): Promise<User | null> => {
    const user = await this.userRepository.findByPk(id);
    return user;
  };
}
