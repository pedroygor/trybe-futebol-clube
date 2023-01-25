import UserRepository from '../../repositories/UserRepository';

export default class RoleValidateUseCase {
  constructor(private repository = new UserRepository()) {}

  execute = async (id: number) => {
    const user = await this.repository.findById(id);

    if (!user) {
      return { type: 401, message: 'user does not exists' };
    }

    return { type: null, message: user.role };
  };
}
