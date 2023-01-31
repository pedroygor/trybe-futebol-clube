import { IRanking } from '../../interfaces/IRanking';
import { IRankingResult } from '../../interfaces/IRankingResult';
import RankingAwayUseCase from '../rankingAway/RankingAwayUseCase';
import RankingHomeUseCase from '../rankingHome/RankingHomeUseCase';

export default class RankingFullUseCase {
  private rankingHomeUseCase: RankingHomeUseCase;
  private rankingAwayUseCase: RankingAwayUseCase;

  constructor() {
    this.rankingHomeUseCase = new RankingHomeUseCase();
    this.rankingAwayUseCase = new RankingAwayUseCase();
  }

  fullRanking = async () => {
    const rankingHome = await this.rankingHomeUseCase.homeRanking();
    const rankingAway = await this.rankingAwayUseCase.awayRanking();
    const rankingFull: IRanking[] = rankingHome.map((teamHome) => {
      const ranking = this.initRanking(teamHome.name);
      const infoTeamAway = rankingAway.find((teamAway) => teamAway.name === teamHome.name);
      if (infoTeamAway) {
        ranking.totalVictories = teamHome.totalVictories + infoTeamAway.totalVictories;
        ranking.totalDraws = teamHome.totalDraws + infoTeamAway.totalDraws;
        ranking.totalLosses = teamHome.totalLosses + infoTeamAway.totalLosses;
        ranking.goalsFavor = teamHome.goalsFavor + infoTeamAway.goalsFavor;
        ranking.goalsOwn = teamHome.goalsOwn + infoTeamAway.goalsOwn;
      }
      const calculo = this.calculate(ranking);
      return { ...ranking, ...calculo };
    });
    return this.sortResult(rankingFull);
  };

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
