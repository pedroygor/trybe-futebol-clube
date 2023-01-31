import { ITeamRepository } from '../../../teams/interfaces/ITeamRepository';
import { IMatchRepository } from '../../../match/interfaces/IMatchRepository';
import MatchRepository from '../../../match/repositories/MatchRepository';
import TeamRepository from '../../../teams/repositories/TeamRepository';
import { IRanking } from '../../interfaces/IRanking';
import { IRankingResult } from '../../interfaces/IRankingResult';

export default class RankingHomeUseCase {
  private matchRepository: IMatchRepository;
  private teamRepository: ITeamRepository;

  constructor(
    matchRepository: IMatchRepository = new MatchRepository(),
    teamRepository: ITeamRepository = new TeamRepository(),
  ) {
    this.matchRepository = matchRepository;
    this.teamRepository = teamRepository;
  }

  async homeRanking(): Promise<IRanking[]> {
    const teams = await this.teamRepository.findAll();
    const result: IRanking[] = await Promise.all(
      teams.map(async (team) => {
        const ranking = this.initRanking(team.teamName);
        const matches = await this.matchRepository.findHomeTeamMatchesFinished(team.id);
        matches.forEach((match) => {
          if (match.homeTeamGoals > match.awayTeamGoals) ranking.totalVictories += 1;
          else if (match.homeTeamGoals < match.awayTeamGoals) ranking.totalLosses += 1;
          else ranking.totalDraws += 1;
          ranking.goalsFavor += match.homeTeamGoals;
          ranking.goalsOwn += match.awayTeamGoals;
        });
        const calculo = this.calculate(ranking);
        return { ...ranking, ...calculo };
      }),
    );
    return this.sortResult(result);
  }

  private initRanking = (name: string): IRanking => ({
    name,
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: '',
  });

  private calculateEfficiency = (points: number, games: number) => (points / (games * 3)) * 100;

  private calculate = (ranking: IRanking): IRankingResult => {
    const goalsBalance = ranking.goalsFavor - ranking.goalsOwn;
    const totalPoints = ranking.totalVictories * 3 + ranking.totalDraws;
    const totalGames = ranking.totalVictories + ranking.totalLosses + ranking.totalDraws;
    const efficiency = this.calculateEfficiency(totalPoints, totalGames).toFixed(2);

    return { goalsBalance, totalGames, totalPoints, efficiency };
  };

  private sortResult = (result: IRanking[]) => result.sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) {
      return b.totalPoints - a.totalPoints;
    } if (b.totalVictories !== a.totalVictories) {
      return b.totalVictories - a.totalVictories;
    } if (b.goalsBalance !== a.goalsBalance) {
      return b.goalsBalance - a.goalsBalance;
    } if (b.goalsFavor !== a.goalsFavor) {
      return b.goalsFavor - a.goalsFavor;
    }
    return a.goalsOwn - b.goalsOwn;
  });
}
