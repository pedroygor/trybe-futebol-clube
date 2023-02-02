import { expect } from 'chai';
import * as sinon from 'sinon';
import { IMatchRepository } from '../modules/match/interfaces/IMatchRepository';
import MatchRepository from '../modules/match/repositories/MatchRepository';
import UpdateMatchGoalsUseCase 
  from '../modules/match/useCases/updateMatchGoals/UpdateMatchGoalsUseCase';

describe('UpdateMatchGoalsUseCase', () => {
  let matchRepository: IMatchRepository;
  let updateMatchGoals: UpdateMatchGoalsUseCase;

  beforeEach(() => {
    matchRepository = new MatchRepository();
    updateMatchGoals = new UpdateMatchGoalsUseCase(matchRepository);
  });

  it('deve atualizar as metas de um jogo corretamente', async () => {
    const updateMatchGoalsStub = sinon.stub(matchRepository, 'updateMatchGoals');
    updateMatchGoalsStub.resolves();

    const request = {
      id: 1,
      homeTeamGoals: 3,
      awayTeamGoals: 1,
    };

    await updateMatchGoals.execute(request);

    expect(updateMatchGoalsStub.calledOnceWith(1, 3, 1)).to.be.true;
  });

});
