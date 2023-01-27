import { expect } from "chai";
import * as sinon from 'sinon';

import { ITeamRepository } from "../modules/teams/interfaces/ITeamRepository";
import GetAllTeamsUseCase from '../modules/teams/useCases/getAllTeams/GetAllTeamsUseCase';
import Team from "../database/models/Team";
import TeamRepository from "../modules/teams/repositories/TeamRepository";

describe('GetAllTeamsUseCase', () => {
  let teamRepository: ITeamRepository;
  let getAllTeamsUseCase: GetAllTeamsUseCase;

  beforeEach(() => {
    teamRepository = new TeamRepository();
    getAllTeamsUseCase = new GetAllTeamsUseCase(teamRepository);
  });

  it('should return all teams', async () => {
    const teams = [{
      id: 1,
      teamName: 'Ceará'
    }, {
      id: 2,
      teamName: 'Quixadá'
    }] as Team[];

    sinon.stub(teamRepository, 'findAll').resolves(teams);

    const response = await getAllTeamsUseCase.execute();

    expect(response).to.equal(teams);
  });
})