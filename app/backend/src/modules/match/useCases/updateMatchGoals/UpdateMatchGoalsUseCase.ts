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
    await this.matchRepository.updateMatchGoals(id, homeTeamGoals, awayTeamGoals);
  };
}
