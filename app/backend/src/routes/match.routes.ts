import { Router } from 'express';
import GetAllMatchesController
  from '../modules/match/useCases/getAllMatches/GetAllMatchesController';

const matchRoutes = Router();

const getAllMatchesController = new GetAllMatchesController();

matchRoutes.get('/matches', getAllMatchesController.handle);

export default matchRoutes;
