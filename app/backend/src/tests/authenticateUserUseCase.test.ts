import { expect } from 'chai';
import * as sinon from 'sinon';

import { IUserRepository } from './../modules/user/interfaces/IUserRepository';
import AuthenticateUserUseCase 
  from '../modules/user/useCases/authenticateUser/AuthenticateUserUseCase';
import User from '../database/models/User';
import UserRepository from '../modules/user/repositories/UserRepository';

describe('AuthenticateUserUseCase', () => {
  let userRepository: IUserRepository;
  let authenticateUseCase: AuthenticateUserUseCase;

  beforeEach(() => {
    userRepository = new UserRepository();
    authenticateUseCase = new AuthenticateUserUseCase(userRepository);
  });

  it('should return a token if email and password match', async () => {
    sinon.stub(userRepository, 'findByEmail').resolves({
      id: 1,
      email: 'test@example.com',
      password: 'hashed_password',
      role: 'user',
      username: 'test',
    } as User)

    const request = { email: 'test@example.com', password: 'password' };
    const response = await authenticateUseCase.execute(request);
    
    expect(response.message).to.be.a('string');
    expect(response.message).to.have.length.greaterThan(0);
  });

  it('should return an error if email and password do not match', async () => {
    sinon.stub(userRepository, 'findByEmail').resolves({
      id: 1,
      email: 'test@example.com',
      password: 'hashed_password',
      role: 'user',
      username: 'test',
    } as User)
    const request = { email: 'test@example.com', password: 'wrong_password' };
    const response = await authenticateUseCase.execute(request);
    expect(response.type).to.equal(401);
    expect(response.message).to.equal('Incorrect email or password');
  });

  it('should return an error if email is not found', async () => {
    sinon.stub(userRepository, 'findByEmail').resolves(null)
    const request = { email: 'test@example.com', password: 'password' };
    const response = await authenticateUseCase.execute(request);
    expect(response.type).to.equal(401);
    expect(response.message).to.equal('Incorrect email or password');
  });

  it('should return an error if fields are not filled', async () => {
    const request = { email: 'test@example.com', password: '' };
    const response = await authenticateUseCase.execute(request);
    expect(response.type).to.equal(400);
    expect(response.message).to.equal('All fields must be filled');
  });
});
