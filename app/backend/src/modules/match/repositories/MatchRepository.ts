import Match from '../../../database/models/Match';
import { IMatchRepository } from '../interfaces/IMatchRepository';

export default class MatchRepository implements IMatchRepository {
  private repository = Match;
  findAll = async (): Promise<Match[]> => {
    const matches = await this.repository.findAll();

    return matches;
  };
}
