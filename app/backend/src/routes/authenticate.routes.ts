import { Router } from 'express';

import validateJWT from '../middlewares/validateJWT';
import RoleValidateController from '../modules/user/useCases/roleValidation/RoleValidateController';
import AuthenticateUserController
  from '../modules/user/useCases/authenticateUser/AuthenticateUserController';

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

const roleValidateController = new RoleValidateController();

authenticateRoutes
  .post('/login', authenticateUserController.handle.bind(authenticateUserController));

authenticateRoutes
  .get(
    '/login/validate',
    validateJWT,
    roleValidateController.handle.bind(roleValidateController),
  );

export default authenticateRoutes;
