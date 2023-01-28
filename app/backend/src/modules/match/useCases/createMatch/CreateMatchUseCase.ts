import { IMatchRepository } from '../../interfaces/IMatchRepository';
import MatchRepository from '../../repositories/MatchRepository';

interface IRequest {
  homeTeamId: number;
  awayTeamId: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export default class CreateMatchUseCase {
  constructor(private matchRepository: IMatchRepository = new MatchRepository()) {}

  execute = async ({ homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals }: IRequest) => {
    const inProgress = 1;

    const newMatch = await this.matchRepository
      .createMatch({ homeTeamId, awayTeamId, awayTeamGoals, homeTeamGoals, inProgress });

    return newMatch;
  };
}
