import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { IUserRepository } from '../../interfaces/IUserRepository';
import UserRepository from '../../repositories/UserRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  type: null | number;
  message: object;
}

export default class AuthenticateUserUseCase {
  constructor(private repository: IUserRepository = new UserRepository()) {}

  execute = async ({ email, password }: IRequest): Promise<IResponse> => {
    if (!email || !password) {
      return {
        type: 400, message: { message: 'All fields must be filled' },
      };
    }
    const user = await this.repository.findByEmail(email);

    if (!user) {
      return { type: 401, message: { message: 'Incorrect email or password' } };
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return { type: 401, message: { message: 'Incorrect email or password' } };
    }
    const payload = { id: user.id, username: user.username, email: user.email };
    const token = sign({ payload }, '992969e4cda1f8f6974c9e571d2c1507', {
      expiresIn: '300d',
    });

    return { type: null, message: { token } };
  };
}
