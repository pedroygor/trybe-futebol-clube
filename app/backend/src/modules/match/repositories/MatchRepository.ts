import { ICreateMatchDTO } from '../dtos/ICreateMatchDTO';
import Match from '../../../database/models/Match';
import { IMatchRepository } from '../interfaces/IMatchRepository';

export default class MatchRepository implements IMatchRepository {
  private repository = Match;

  findAll = async (): Promise<Match[]> => {
    const matches = await this.repository.findAll({
      include: [{
        association: 'homeTeam',
        attributes: ['teamName'],
      }, {
        association: 'awayTeam',
        attributes: ['teamName'],
      }],
    });

    return matches;
  };

  findAllMatchesInProgress = async (progress: number) => {
    const matches = await this.repository.findAll({
      include: [{
        association: 'homeTeam',
        attributes: ['teamName'],
      }, {
        association: 'awayTeam',
        attributes: ['teamName'],
      }],
      where: {
        inProgress: progress,
      },
    });

    return matches;
  };

  createMatch = async ({
    homeTeamId,
    awayTeamId,
    homeTeamGoals,
    awayTeamGoals,
    inProgress,
  }: ICreateMatchDTO) => {
    const newMatch = await this.repository
      .create({ homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals, inProgress });

    return newMatch;
  };

  changeInProgress = async (id: number) => {
    await this.repository.update({ inProgress: 0 }, { where: { id } });
  };

  findById = async (id: number) => {
    const match = await this.repository.findByPk(id);

    return match;
  };
}
