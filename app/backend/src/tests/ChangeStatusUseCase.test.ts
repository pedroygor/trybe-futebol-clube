import { expect } from 'chai';
import * as sinon from 'sinon';
import MatchRepository  from '../modules/match/repositories/MatchRepository';
import ChangeStatusUseCase from '../modules/match/useCases/changeStatus/ChangeStatusUseCase';


describe('ChangeStatusUseCase', () => {
  let matchRepository: MatchRepository;
  let changeStatusUseCase: ChangeStatusUseCase;
  let changeInProgressStub: sinon.SinonStub;

  beforeEach(() => {
    matchRepository = new MatchRepository();
    changeInProgressStub = sinon.stub(matchRepository, 'changeInProgress');
    changeStatusUseCase = new ChangeStatusUseCase(matchRepository);
  });

  afterEach(() => {
    changeInProgressStub.restore();
  });

  it('should call changeInProgress with the correct id', async () => {
    const id = 1;
    await changeStatusUseCase.execute(id);
    expect(changeInProgressStub.calledWith(id)).to.be.true;
  });

  it('should return a message saying "Finished"', async () => {
    const id = 1;
    const result = await changeStatusUseCase.execute(id);
    expect(result).to.deep.equal({ message: 'Finished' });
  });
});
