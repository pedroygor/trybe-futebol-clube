import { ICreateMatchDTO } from '../dtos/ICreateMatchDTO';
import Match from '../../../database/models/Match';

export interface IMatchRepository {
  findAll: () => Promise<Match[]>;
  findAllMatchesInProgress: (progress: number) => Promise<Match[]>;
  createMatch: (match: ICreateMatchDTO) => Promise<Match>;
  changeInProgress: (id: number) => Promise<void>;
  updateMatchGoals: (id: number, homeTeamGoals: number, awayTeamGoals: number) => Promise<void>;
  findHomeTeamMatchesFinished: (id: number) => Promise<Match[]>;
  findAwayTeamMatchesFinished: (id: number) => Promise<Match[]>;
}
