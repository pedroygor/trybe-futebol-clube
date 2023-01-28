import { ITeamRepository } from '../../../teams/interfaces/ITeamRepository';
import { IMatchRepository } from '../../interfaces/IMatchRepository';
import MatchRepository from '../../repositories/MatchRepository';
import TeamRepository from '../../../teams/repositories/TeamRepository';

interface IRequest {
  homeTeamId: number;
  awayTeamId: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export default class CreateMatchUseCase {
  constructor(
    private matchRepository: IMatchRepository = new MatchRepository(),
    private teamRepository: ITeamRepository = new TeamRepository(),
  ) {}

  execute = async ({ homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals }: IRequest) => {
    const response = this.verifyIfIdAreTheSame(homeTeamId, awayTeamId);
    if (response) return response;

    const isTeamExists = await this.verifyIfTeamExists(homeTeamId, awayTeamId);
    if (isTeamExists) return isTeamExists;

    const inProgress = 1;

    const newMatch = await this.matchRepository
      .createMatch({ homeTeamId, awayTeamId, awayTeamGoals, homeTeamGoals, inProgress });

    return { type: null, message: newMatch };
  };

  verifyIfIdAreTheSame = (homeTeamId: number, awayTeamId: number) => {
    if (homeTeamId === awayTeamId) {
      return { type: 422, message: 'It is not possible to create a match with two equal teams' };
    }
  };

  verifyIfTeamExists = async (homeTeamId: number, awayTeamId: number) => {
    const homeTeam = await this.teamRepository.findById(homeTeamId);
    const awayTeam = await this.teamRepository.findById(awayTeamId);

    if (!homeTeam || !awayTeam) {
      return { type: 404, message: 'There is no team with such id!' };
    }
  };
}
