import { Router } from 'express';
// import validateJWT from '../middlewares/validateJWT';
import CreateMatchController from '../modules/match/useCases/createMatch/CreateMatchController';
import GetAllMatchesController
  from '../modules/match/useCases/getAllMatches/GetAllMatchesController';

const matchRoutes = Router();

const getAllMatchesController = new GetAllMatchesController();
const createMatchController = new CreateMatchController();

matchRoutes.post('/matches', createMatchController.handle);

matchRoutes.get('/matches', getAllMatchesController.handle);

export default matchRoutes;
