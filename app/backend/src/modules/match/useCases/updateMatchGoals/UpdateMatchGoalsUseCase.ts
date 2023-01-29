import { IMatchRepository } from '../../interfaces/IMatchRepository';
import MatchRepository from '../../repositories/MatchRepository';

interface IRequest {
  id: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export default class UpdateMatchGoalsUseCase {
  constructor(private matchRepository: IMatchRepository = new MatchRepository()) {}

  execute = async ({ id, homeTeamGoals, awayTeamGoals }: IRequest) => {
    const match = await this.matchRepository.findById(id);
    if (match) {
      match.homeTeamGoals = homeTeamGoals;
      match.awayTeamGoals = awayTeamGoals;
      await match.save();
    }
  };
}
