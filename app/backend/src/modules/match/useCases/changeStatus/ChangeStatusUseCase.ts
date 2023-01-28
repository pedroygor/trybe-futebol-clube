import { IMatchRepository } from '../../interfaces/IMatchRepository';
import MatchRepository from '../../repositories/MatchRepository';

export default class ChangeStatusUseCase {
  constructor(private matchRepository: IMatchRepository = new MatchRepository()) {}

  execute = async (id: number) => {
    await this.matchRepository.changeInProgress(id);

    return { message: 'Finished' };
  };
}
