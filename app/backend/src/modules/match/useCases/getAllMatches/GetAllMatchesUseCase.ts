import { IMatchRepository } from '../../interfaces/IMatchRepository';
import MatchRepository from '../../repositories/MatchRepository';

export default class GetAllMatchesUseCase {
  constructor(private matchRepository: IMatchRepository = new MatchRepository()) {}

  execute = async (inProgress?: string) => {
    if (inProgress) {
      const progress = inProgress === 'false' ? 0 : 1;
      const matches = this.matchRepository.findAllMatchesInProgress(progress);

      return matches;
    }
    const matches = await this.matchRepository.findAll();

    return matches;
  };
}
