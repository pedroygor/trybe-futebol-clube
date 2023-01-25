import { Router } from 'express';
import GetTeamByIdController from '../modules/teams/useCases/getTeamById/GetTeamByIdController';
import GetAllTeamsController from '../modules/teams/useCases/getAllTeams/GetAllTeamsController';

const teamRoutes = Router();

const getTeamByIdController = new GetTeamByIdController();
const getAllTeamsController = new GetAllTeamsController();

teamRoutes.get('/teams', getAllTeamsController.handle);
teamRoutes.get('/teams/:id', getTeamByIdController.handle);

export default teamRoutes;
