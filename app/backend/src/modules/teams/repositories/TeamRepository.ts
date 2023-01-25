import Team from '../../../database/models/Team';
import { ITeamRepository } from '../interfaces/ITeamRepository';

export default class TeamRepository implements ITeamRepository {
  private repository = Team;

  findAll = async (): Promise<Team[]> => {
    const teams = await this.repository.findAll();

    return teams;
  } ;

  findById = async (id: number): Promise<Team | null> => {
    const team = await this.repository.findByPk(id);

    return team;
  };
}
