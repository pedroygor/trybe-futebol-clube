import { ICreateMatchDTO } from '../dtos/ICreateMatchDTO';
import Match from '../../../database/models/Match';

export interface IMatchRepository {
  findAll: () => Promise<Match[]>;
  findAllMatchesInProgress: (progress: number) => Promise<Match[]>;
  createMatch: (match: ICreateMatchDTO) => Promise<Match>;
  changeInProgress: (id: number) => Promise<void>;
  findById: (id: number) => Promise<Match | null>;
}
