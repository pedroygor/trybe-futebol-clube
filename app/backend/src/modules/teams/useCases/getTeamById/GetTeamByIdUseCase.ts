import { ITeamRepository } from '../../interfaces/ITeamRepository';
import TeamRepository from '../../repositories/TeamRepository';

export default class GetTeamByIdUseCase {
  constructor(private teamRepository: ITeamRepository = new TeamRepository()) {}

  execute = async (id: number) => {
    const team = await this.teamRepository.findById(id);

    if (!team) {
      return {
        type: 400,
        message: 'Team not found',
      };
    }
    return { type: null, message: team };
  };
}
