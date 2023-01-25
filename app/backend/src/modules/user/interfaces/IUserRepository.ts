import User from '../../../database/models/User';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';

export interface IUserRepository {
  create: ({ username, email, password, role }: ICreateUserDTO) => Promise<User>;
  findByEmail: (email: string) => Promise<User | null>;
  findById: (id: number) => Promise<User | null>;
}
