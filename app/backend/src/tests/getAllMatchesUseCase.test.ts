import { expect } from "chai";
import * as sinon from 'sinon';

import { IMatchRepository } from './../modules/match/interfaces/IMatchRepository';
import GetAllMatchesUseCase from '../modules/match/useCases/getAllMatches/GetAllMatchesUseCase';
import Match from "../database/models/Match";
import MatchRepository from "../modules/match/repositories/MatchRepository";

describe('GetAllMatchesUseCase', () => {
  let matchRepository: IMatchRepository;
  let getAllMatchesUseCase: GetAllMatchesUseCase;

  beforeEach(() => {
    matchRepository = new MatchRepository();
    getAllMatchesUseCase = new GetAllMatchesUseCase(matchRepository);
  });

  it('should return an array of matches', async () => {
    const matches = [{
        home_team_id: 16,
        home_team_goals: 1,
        away_team_id: 8,
        away_team_goals: 1,
        in_progress: 0,
      }, {
        home_team_id: 9,
        home_team_goals: 1,
        away_team_id: 14,
        away_team_goals: 1,
        in_progress: 0,
      },
    ] as unknown as Match[];
    
    sinon.stub(matchRepository, 'findAll').resolves(matches);

    const response = await getAllMatchesUseCase.execute();
    const expectedResponse = [matches[0], matches[1]];

    expect(response).to.deep.equal(expectedResponse);
  });

  it('should return an array of matches in progress', async () => {
    const matches = [ {
      home_team_id: 16,
      home_team_goals: 1,
      away_team_id: 8,
      away_team_goals: 1,
      in_progress: 0,
    }, {
      home_team_id: 9,
      home_team_goals: 1,
      away_team_id: 14,
      away_team_goals: 1,
      in_progress: 0,
    }] as unknown as Match[];

    sinon.stub(matchRepository, 'findAllMatchesInProgress').resolves(matches);

    const response = await getAllMatchesUseCase.execute('false');

    expect(response).to.deep.equal(matches);
  });
});