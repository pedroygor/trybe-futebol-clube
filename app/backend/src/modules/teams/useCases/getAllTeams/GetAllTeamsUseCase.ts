import { ITeamRepository } from '../../interfaces/ITeamRepository';
import TeamRepository from '../../repositories/TeamRepository';

export default class GetAllTeamsUseCase {
  constructor(private teamRepository: ITeamRepository = new TeamRepository()) {}

  execute = async () => {
    const teams = await this.teamRepository.findAll();

    return teams;
  };
}
