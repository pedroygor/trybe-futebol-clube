// import Match from '../../../../database/models/Match';
import { IMatchRepository } from '../../interfaces/IMatchRepository';
import MatchRepository from '../../repositories/MatchRepository';

export default class GetAllMatchesUseCase {
  constructor(private matchRepository: IMatchRepository = new MatchRepository()) {}

  execute = async (inProgress?: string) => {
    if (inProgress) {
      const progress = inProgress === 'false' ? 0 : 1;
      const matchInProgress = this.matchRepository.findAllMatchesInProgress(progress);

      return matchInProgress;
    }
    const matches = await this.matchRepository.findAll();

    return matches;
  };
}
