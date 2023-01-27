import * as sinon from 'sinon';
import { expect } from 'chai';

import RoleValidateUseCase from '../modules/user/useCases/roleValidation/RoleValidateUseCase';
import UserRepository from '../modules/user/repositories/UserRepository';
import User from '../database/models/User';


describe('RoleValidateUseCase', () => {
  let userRepository: UserRepository;
  let roleValidateUseCase: RoleValidateUseCase;

  beforeEach(() => {
    userRepository = new UserRepository();
    roleValidateUseCase = new RoleValidateUseCase(userRepository);
  });

  it('Should return the user role if the user exists', async () => {
    // Stub the findById method of the UserRepository class
    sinon.stub(userRepository, 'findById').resolves({
      id: 1,
      username: 'testuser',
      email: 'testuser@example.com',
      role: 'admin',
      password: 'sff',
    } as User
    );

    const { type, message } = await roleValidateUseCase.execute(1);

    expect(type).to.be.null;
    expect(message).to.be.equal('admin');

  });

  it('Should return an error message if the user does not exist', async () => {
    // Stub the findById method of the UserRepository class
    sinon.stub(userRepository, 'findById').resolves(null);

    const { type, message } = await roleValidateUseCase.execute(1);

    expect(type).to.be.equal(401);
    expect(message).to.be.equal('user does not exists');

  });
});
