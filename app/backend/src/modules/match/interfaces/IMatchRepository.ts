import Match from '../../../database/models/Match';

export interface IMatchRepository {
  findAll: () => Promise<Match[]>;
  findAllMatchesInProgress: (progress: number) => Promise<Match[]>;
}
