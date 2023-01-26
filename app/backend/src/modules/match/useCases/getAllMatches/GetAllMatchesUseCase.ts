// import Match from '../../../../database/models/Match';
import { IMatchRepository } from '../../interfaces/IMatchRepository';
import MatchRepository from '../../repositories/MatchRepository';

export default class GetAllMatchesUseCase {
  constructor(private matchRepository: IMatchRepository = new MatchRepository()) {}

  execute = async () => {
    const matches = await this.matchRepository.findAll();

    return matches;
  };
}
