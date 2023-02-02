import { expect } from 'chai';
import * as sinon from 'sinon';
import MatchRepository from '../modules/match/repositories/MatchRepository';
import Match from '../database/models/Match';
import Team from '../database/models/Team';
import { ICreateMatchDTO } from '../modules/match/dtos/ICreateMatchDTO';

describe('MatchRepository', () => {
  let matchRepository: MatchRepository;
  let findAllStub: sinon.SinonStub;
  let createStub: sinon.SinonStub;
  let updateStub: sinon.SinonStub;
  let sandbox: sinon.SinonSandbox;
  

  beforeEach(() => {
    matchRepository = new MatchRepository();
    findAllStub = sinon.stub(Match, 'findAll').resolves([{ id: 1, homeTeamId: 2, awayTeamId: 3 }] as unknown[] as Match[]);
    createStub = sinon.stub(Match, 'create');
    updateStub = sinon.stub(Match, 'update');
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    findAllStub.restore();
    createStub.restore();
    updateStub.restore();
    sandbox.restore();
  });

  it('should return a list of matches', async () => {
    const matches = await matchRepository.findAll();

    expect(matches).to.be.an('array');
    expect(matches).to.have.lengthOf(1);
    expect(matches[0]).to.have.property('id', 1);
    expect(matches[0]).to.have.property('homeTeamId', 2);
    expect(matches[0]).to.have.property('awayTeamId', 3);
    expect(findAllStub.calledOnce).to.be.true;
  });

  it('should call the create method from the Match model', async () => {
    const homeTeamId = 1;
    const awayTeamId = 2;
    const homeTeamGoals = 3;
    const awayTeamGoals = 2;
    const inProgress = 1;
    const matchDTO: ICreateMatchDTO = {
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress,
    };

    createStub.resolves({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress,
    });

    await matchRepository.createMatch(matchDTO);

    expect(createStub.calledOnceWith(matchDTO)).to.be.true;
  });
  
  it('should call repository.update with correct parameters', async () => {
    const id = 1;

    await matchRepository.changeInProgress(id);

    expect(updateStub.calledOnce).to.be.true;
    expect(updateStub.getCall(0).args).to.deep.equal([
      { inProgress: 0 },
      { where: { id } },
    ]);
  });

  it('deve atualizar os gols da partida', async () => {
    const matchRepository = new MatchRepository();

    updateStub.returns(Promise.resolve({}));
    await matchRepository.updateMatchGoals(1, 2, 3);

    expect(updateStub.calledWith({ homeTeamGoals: 2, awayTeamGoals: 3 }, { where: { id: 1 } })).to.be.true;
  });
});
