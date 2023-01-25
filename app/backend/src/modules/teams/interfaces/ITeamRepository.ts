import Team from '../../../database/models/Team';

export interface ITeamRepository {
  findAll: () => Promise<Team[]>;
  findById: (id: number) => Promise<Team | null>;
}
