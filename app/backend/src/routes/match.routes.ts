import { Router } from 'express';
import ChangeStatusController from '../modules/match/useCases/changeStatus/ChangeStatusController';
import validateJWT from '../middlewares/validateJWT';
import CreateMatchController from '../modules/match/useCases/createMatch/CreateMatchController';
import GetAllMatchesController
  from '../modules/match/useCases/getAllMatches/GetAllMatchesController';
import UpdateMatchGoalsController
  from '../modules/match/useCases/updateMatchGoals/UpdateMatchGoalsController';

const matchRoutes = Router();

const getAllMatchesController = new GetAllMatchesController();
const createMatchController = new CreateMatchController();
const changeStatusController = new ChangeStatusController();
const updateMatchGoals = new UpdateMatchGoalsController();

matchRoutes.post('/matches', validateJWT, createMatchController.handle);

matchRoutes.get('/matches', getAllMatchesController.handle);

matchRoutes.patch('/matches/:id/finish', changeStatusController.handle);

matchRoutes.patch('/matches/:id', updateMatchGoals.handle);

export default matchRoutes;
