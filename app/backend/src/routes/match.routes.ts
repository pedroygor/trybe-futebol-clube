import { Router } from 'express';
import ChangeStatusController from '../modules/match/useCases/changeStatus/ChangeStatusController';
import validateJWT from '../middlewares/validateJWT';
import CreateMatchController from '../modules/match/useCases/createMatch/CreateMatchController';
import GetAllMatchesController
  from '../modules/match/useCases/getAllMatches/GetAllMatchesController';

const matchRoutes = Router();

const getAllMatchesController = new GetAllMatchesController();
const createMatchController = new CreateMatchController();
const changeStatusController = new ChangeStatusController();

matchRoutes.post('/matches', validateJWT, createMatchController.handle);

matchRoutes.get('/matches', getAllMatchesController.handle);

matchRoutes.patch('/matches/:id/finish', changeStatusController.handle);

export default matchRoutes;
