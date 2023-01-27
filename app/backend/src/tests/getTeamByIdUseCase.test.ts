import { expect } from "chai";
import * as sinon from 'sinon';

import { IUserRepository } from "../modules/user/interfaces/IUserRepository";
import GetTeamByIdUseCase from '../modules/teams/useCases/getTeamById/GetTeamByIdUseCase';
import Team from "../database/models/Team";
import TeamRepository from "../modules/teams/repositories/TeamRepository";
import { ITeamRepository } from "../modules/teams/interfaces/ITeamRepository";

describe('GetTeamByIdUseCase',() => {
  let teamRepository: ITeamRepository;
  let getTeamByIdUseCase: GetTeamByIdUseCase;

  beforeEach(() => {
    teamRepository = new TeamRepository();
    getTeamByIdUseCase = new GetTeamByIdUseCase(teamRepository)
  });

  it('should return a teams if team exists', async () => {
    const team = {
      id: 1,
      teamName: 'Ceará'
    } as Team;
    sinon.stub(teamRepository, 'findById').resolves(team);
    const response = await getTeamByIdUseCase.execute(1);

    expect(response.type).to.be.null
    expect(response.message).to.equal(team)
  });

  it('should return an error if team not found', async () => {
    sinon.stub(teamRepository, 'findById').resolves(null);

    const response = await getTeamByIdUseCase.execute(2);

    expect(response.type).to.equal(400);
    expect(response.message).to.equal('Team not found');
  })
});