import { expect } from 'chai';
import * as sinon from 'sinon';
import UserRepository from '../modules/user/repositories/UserRepository';
import User from '../database/models/User';

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let user: unknown;
  let createStub: sinon.SinonStub;
  let findOneStub: sinon.SinonStub;
  let findByPkStub: sinon.SinonStub;

  beforeEach(() => {
    userRepository = new UserRepository();
    user = User;
    createStub = sinon.stub(User, 'create');
    findOneStub = sinon.stub(User, 'findOne');
    findByPkStub = sinon.stub(User, 'findByPk');
  });

  afterEach(() => {
    createStub.restore();
    findOneStub.restore();
    findByPkStub.restore();
  });

  it('should create a user', async () => {
    createStub.resolves(user);
    const result = await userRepository.create({
      username: 'test',
      email: 'test@email.com',
      password: 'test',
      role: 'user',
    });

    expect(result).to.be.equal(user);
  });

  it('should return a user by email', async () => {
    findOneStub.resolves(user);
    const result = await userRepository.findByEmail('test@email.com');

    expect(result).to.be.equal(user);
  });

  it('should return a user by id', async () => {
    findByPkStub.resolves(user);
    const result = await userRepository.findById(1);

    expect(result).to.be.equal(user);
  });
});
